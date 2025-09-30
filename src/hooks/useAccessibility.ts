import { useState, useCallback, useEffect } from 'react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  voiceEnabled: boolean;
}

interface AudioCue {
  type: 'success' | 'error' | 'selection' | 'navigation';
  sound?: string;
}

export const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: true, // Default to large text for accessibility
    reduceMotion: false,
    voiceEnabled: true,
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
      const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext);
      if (!AudioCtx) return;

      const audioContext = new AudioCtx();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different sounds for different cues
      switch (cue.type) {
        case 'success':
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
          oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
          oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
          break;
        case 'error':
          oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
          oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.15); // G3
          break;
        case 'selection':
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 - neutral beep
          break;
        case 'navigation':
          oscillator.frequency.setValueAtTime(330, audioContext.currentTime); // E4 - soft navigation sound
          break;
      }

      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      // Some browsers start audio contexts suspended
      audioContext.resume?.();

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
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

    // Play distinct audio tones for each option
    try {
      const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext);
      if (!AudioCtx) return;

      const audioContext = new AudioCtx();
      audioContext.resume?.();

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for each option
      const frequencies = [
        349.23, // Option A: F4
        392.00, // Option B: G4
        440.00, // Option C: A4
        493.88, // Option D: B4
      ];

      oscillator.frequency.setValueAtTime(
        frequencies[optionIndex] || 440,
        audioContext.currentTime
      );

      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
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