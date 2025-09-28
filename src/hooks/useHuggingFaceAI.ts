import { useState, useCallback, useRef } from 'react';
import { pipeline } from '@huggingface/transformers';

interface HuggingFaceAIHook {
  isTranscribing: boolean;
  transcribeAudio: (audioBlob: Blob) => Promise<string>;
  evaluateAnswer: (userAnswer: string, correctAnswer: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export const useHuggingFaceAI = (): HuggingFaceAIHook => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const transcriberRef = useRef<any>(null);
  const classifierRef = useRef<any>(null);

  // Initialize Whisper for speech-to-text
  const initializeTranscriber = useCallback(async () => {
    if (transcriberRef.current) return transcriberRef.current;
    
    try {
      setIsLoading(true);
      const transcriber = await pipeline(
        'automatic-speech-recognition',
        'onnx-community/whisper-tiny.en',
        { 
          device: 'webgpu',
          // Fallback to CPU if WebGPU not available
          ...(typeof navigator !== 'undefined' && !('gpu' in navigator) ? { device: 'cpu' } : {})
        }
      );
      transcriberRef.current = transcriber;
      return transcriber;
    } catch (err) {
      console.warn('Failed to initialize WebGPU, falling back to CPU:', err);
      try {
        const transcriber = await pipeline(
          'automatic-speech-recognition',
          'onnx-community/whisper-tiny.en',
          { device: 'cpu' }
        );
        transcriberRef.current = transcriber;
        return transcriber;
      } catch (cpuErr) {
        setError('Failed to load speech recognition model');
        throw cpuErr;
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize text classifier for answer evaluation
  const initializeClassifier = useCallback(async () => {
    if (classifierRef.current) return classifierRef.current;
    
    try {
      const classifier = await pipeline(
        'zero-shot-classification',
        'facebook/bart-large-mnli',
        { 
          device: typeof navigator !== 'undefined' && ('gpu' in navigator) ? 'webgpu' : 'cpu'
        }
      );
      classifierRef.current = classifier;
      return classifier;
    } catch (err) {
      console.warn('Text classifier not available, using fallback matching');
      return null;
    }
  }, []);

  // Transcribe audio using Whisper
  const transcribeAudio = useCallback(async (audioBlob: Blob): Promise<string> => {
    try {
      setIsTranscribing(true);
      setError(null);
      
      const transcriber = await initializeTranscriber();
      
      // Prefer passing a URL for broader codec support
      const url = URL.createObjectURL(audioBlob);
      const result = await transcriber(url);
      URL.revokeObjectURL(url);
      
      return result.text?.trim() || '';
    } catch (err) {
      const errorMsg = 'Speech recognition failed. Please try speaking more clearly.';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsTranscribing(false);
    }
  }, [initializeTranscriber]);

  // Evaluate if user answer matches correct answer using AI
  const evaluateAnswer = useCallback(async (userAnswer: string, correctAnswer: string): Promise<boolean> => {
    try {
      const classifier = await initializeClassifier();
      
      if (!classifier) {
        // Fallback to simple string matching
        const normalizedUser = userAnswer.toLowerCase().trim();
        const normalizedCorrect = correctAnswer.toLowerCase().trim();
        
        // Check for partial matches, common synonyms
        return normalizedCorrect.includes(normalizedUser) || 
               normalizedUser.includes(normalizedCorrect) ||
               normalizedUser.length > 3 && normalizedCorrect.includes(normalizedUser.substring(0, normalizedUser.length - 1));
      }

      // Use AI classification for better matching
      const result = await classifier(userAnswer, [correctAnswer, 'incorrect answer']);
      
      // Check if the correct answer has higher confidence
      const correctScore = result.scores[result.labels.indexOf(correctAnswer)] || 0;
      return correctScore > 0.5; // Threshold for acceptance
      
    } catch (err) {
      console.warn('Answer evaluation failed, using fallback:', err);
      
      // Simple fallback matching
      const normalizedUser = userAnswer.toLowerCase().trim();
      const normalizedCorrect = correctAnswer.toLowerCase().trim();
      return normalizedCorrect.includes(normalizedUser) || normalizedUser.includes(normalizedCorrect);
    }
  }, [initializeClassifier]);

  return {
    isTranscribing,
    transcribeAudio,
    evaluateAnswer,
    isLoading,
    error,
  };
};