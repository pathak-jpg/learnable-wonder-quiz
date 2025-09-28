import { useState, useCallback, useRef } from 'react';
import { useHuggingFaceAI } from './useHuggingFaceAI';

interface AdvancedSpeechRecognitionHook {
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export const useAdvancedSpeechRecognition = (): AdvancedSpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { transcribeAudio, isTranscribing } = useHuggingFaceAI();

  const startListening = useCallback(async () => {
    try {
      setError(null);
      setIsListening(true);
      audioChunksRef.current = [];

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000, // Optimal for Whisper
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus' // Good compression for speech
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsListening(false);
        setIsProcessing(true);
        
        try {
          // Combine audio chunks
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          
          // Transcribe using Whisper
          const result = await transcribeAudio(audioBlob);
          setTranscript(result);
          
        } catch (err) {
          setError('Failed to process audio. Please try again.');
        } finally {
          setIsProcessing(false);
          // Stop all tracks to release microphone
          stream.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      // Auto-stop after 10 seconds for better UX
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 10000);

    } catch (err) {
      setError('Microphone access denied or not available');
      setIsListening(false);
    }
  }, [transcribeAudio]);

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    isProcessing: isProcessing || isTranscribing,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
};