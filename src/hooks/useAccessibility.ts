import { useState, useCallback, useEffect } from 'react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  voiceEnabled: boolean;
  brailleEnabled: boolean;
}

interface AudioCue {
  type: 'success' | 'error' | 'selection' | 'navigation';
  sound?: string;
}

// Shared Web Audio context to ensure audio works reliably on mobile
let sharedAudioCtx: AudioContext | null = null;
const getAudioCtx = () => {
  try {
    const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext);
    if (!AudioCtx) return null;
    if (!sharedAudioCtx) sharedAudioCtx = new AudioCtx();
    sharedAudioCtx.resume?.();
    return sharedAudioCtx;
  } catch {
    return null;
  }
};

export const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: true, // Default to large text for accessibility
    reduceMotion: false,
    voiceEnabled: true,
    brailleEnabled: false,
  });

  // Text-to-Speech functionality (more robust across mobile browsers)
  const speak = useCallback((text: string, options?: { rate?: number; pitch?: number }) => {
    try {
      if (!settings.voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      const synth = window.speechSynthesis;

      // iOS/Safari resume hack
      if (synth.paused) synth.resume();
      setTimeout(() => { try { synth.resume(); } catch {} }, 0);

      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      // Child-friendly voice settings
      utterance.rate = options?.rate ?? 0.8; // Slower for better comprehension
      utterance.pitch = options?.pitch ?? 1.2; // Higher pitch, more friendly
      utterance.volume = 1;

      const assignVoiceAndSpeak = () => {
        try {
          const voices = synth.getVoices();
          const childVoice = voices.find(v =>
            v && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('child') || v.lang.includes('en-US'))
          );
          if (childVoice) utterance.voice = childVoice;
        } catch {}
        synth.speak(utterance);
      };

      // If voices not loaded yet, wait for them
      if (synth.getVoices().length === 0) {
        const handle = () => {
          assignVoiceAndSpeak();
          synth.removeEventListener?.('voiceschanged', handle as any);
        };
        synth.addEventListener?.('voiceschanged', handle as any);
        // Fallback timeout
        setTimeout(assignVoiceAndSpeak, 250);
      } else {
        assignVoiceAndSpeak();
      }
    } catch (e) {
      // Swallow errors to avoid crashes on unsupported devices
    }
  }, [settings.voiceEnabled]);

  // Haptic feedback
  const vibrate = useCallback((pattern: number | number[]) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }, []);

  // Audio cues for different actions (guarded for mobile browsers)
  const playAudioCue = useCallback((cue: AudioCue) => {
    try {
      const audioContext = getAudioCtx();
      if (!audioContext) return;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different sounds for different cues
      switch (cue.type) {
        case 'success':
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
          setTimeout(() => oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.05), 0);
          setTimeout(() => oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.1), 0);
          break;
        case 'error':
          oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
          setTimeout(() => oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.08), 0);
          break;
        case 'selection':
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 - neutral beep
          break;
        case 'navigation':
          oscillator.frequency.setValueAtTime(330, audioContext.currentTime); // E4 - soft navigation sound
          break;
      }

      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.25);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.25);
    } catch {}
  }, []);

  // Play unique haptic and sound for each option (optimized for Android Chrome)
  const playOptionSound = useCallback((optionIndex: number) => {
    // Distinct haptic patterns for each option (A=1 buzz, B=2 buzzes, C=3 buzzes, D=4 buzzes)
    const hapticPatterns = [
      [100],                    // Option A: single short buzz
      [100, 80, 100],          // Option B: double buzz
      [100, 80, 100, 80, 100], // Option C: triple buzz
      [80, 60, 80, 60, 80, 60, 80], // Option D: quadruple buzz
    ];
    
    const pattern = hapticPatterns[optionIndex] || [100];
    vibrate(pattern);

    // Play distinct, vibrant audio tones for each option
    try {
      const audioContext = getAudioCtx();
      if (!audioContext) return;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();

      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Vibrant, distinct frequencies and patterns for each option
      const soundConfig = [
        { baseFreq: 523.25, endFreq: 659.25, type: 'triangle' as OscillatorType }, // Option A: C5 to E5 (rising)
        { baseFreq: 659.25, endFreq: 523.25, type: 'square' as OscillatorType },   // Option B: E5 to C5 (falling)
        { baseFreq: 440.0, endFreq: 554.37, type: 'triangle' as OscillatorType },  // Option C: A4 to C#5 (rising)
        { baseFreq: 587.33, endFreq: 493.88, type: 'square' as OscillatorType },   // Option D: D5 to B4 (falling)
      ];

      const config = soundConfig[optionIndex] || soundConfig[0];

      // Set waveform type for variety
      oscillator.type = config.type;

      // Add frequency sweep for more interesting sound
      oscillator.frequency.setValueAtTime(config.baseFreq, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(config.endFreq, audioContext.currentTime + 0.15);

      // Lowpass filter for smoother, warmer sound
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(2000, audioContext.currentTime);
      filterNode.Q.setValueAtTime(1, audioContext.currentTime);

      // Louder, clearer volume envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch {}
  }, [vibrate]);

  // Update accessibility settings
  const updateSettings = useCallback((newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Apply accessibility classes to document
  useEffect(() => {
    const classList = document.documentElement.classList;
    
    if (settings.highContrast) {
      classList.add('high-contrast');
    } else {
      classList.remove('high-contrast');
    }

    if (settings.largeText) {
      classList.add('large-text');
    } else {
      classList.remove('large-text');
    }

    if (settings.reduceMotion) {
      classList.add('reduce-motion');
    } else {
      classList.remove('reduce-motion');
    }

    if (settings.brailleEnabled) {
      classList.add('braille-enabled');
    } else {
      classList.remove('braille-enabled');
    }
  }, [settings]);

  return {
    settings,
    updateSettings,
    speak,
    vibrate,
    playAudioCue,
    playOptionSound,
  };
};