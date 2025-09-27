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

  // Text-to-Speech functionality
  const speak = useCallback((text: string, options?: { rate?: number; pitch?: number }) => {
    if (!settings.voiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Child-friendly voice settings
    utterance.rate = options?.rate ?? 0.8; // Slower for better comprehension
    utterance.pitch = options?.pitch ?? 1.2; // Higher pitch, more friendly
    utterance.volume = 1;
    
    // Try to use a child-friendly voice
    const voices = window.speechSynthesis.getVoices();
    const childVoice = voices.find(voice => 
      voice.name.includes('female') || 
      voice.name.includes('child') ||
      voice.lang.includes('en-US')
    );
    if (childVoice) {
      utterance.voice = childVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [settings.voiceEnabled]);

  // Haptic feedback
  const vibrate = useCallback((pattern: number | number[]) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }, []);

  // Audio cues for different actions
  const playAudioCue = useCallback((cue: AudioCue) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
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

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }, []);

  // Confirm answer with haptic feedback
  const confirmAnswer = useCallback((optionIndex: number) => {
    const vibrationPattern = Array(optionIndex + 1).fill(200).reduce((acc, curr, idx) => {
      acc.push(curr);
      if (idx < optionIndex) acc.push(100); // Add pause between vibrations
      return acc;
    }, [] as number[]);
    
    vibrate(vibrationPattern);
    playAudioCue({ type: 'selection' });
  }, [vibrate, playAudioCue]);

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
    confirmAnswer,
  };
};