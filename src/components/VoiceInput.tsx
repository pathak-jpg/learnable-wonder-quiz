import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useAccessibility } from "@/hooks/useAccessibility";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export const VoiceInput = ({
  onTranscript,
  placeholder = "Tap to speak your answer",
  className
}: VoiceInputProps) => {
  const { isListening, transcript, error, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  const { speak, playAudioCue } = useAccessibility();

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
      playAudioCue({ type: 'navigation' });
    } else {
      resetTranscript();
      startListening();
      speak("I'm listening for your answer. Please speak clearly.");
      playAudioCue({ type: 'navigation' });
    }
  };

  const handleAcceptTranscript = () => {
    if (transcript) {
      onTranscript(transcript);
      speak(`You said: ${transcript}. Great!`);
      playAudioCue({ type: 'success' });
      resetTranscript();
    }
  };

  const handleRetryTranscript = () => {
    resetTranscript();
    startListening();
    speak("Let's try again. Please speak your answer clearly.");
    playAudioCue({ type: 'navigation' });
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-center">
        <Button
          onClick={handleToggleListening}
          size="lg"
          className={cn(
            "w-32 h-32 rounded-full text-white font-bold text-lg",
            "transition-all duration-300 transform hover:scale-105",
            "focus:ring-4 focus:ring-primary/30 focus:outline-none",
            isListening 
              ? "bg-destructive hover:bg-destructive/90 animate-pulse" 
              : "bg-primary hover:bg-primary-hover"
          )}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
        </Button>
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg text-muted-foreground">
          {isListening ? "🎤 Listening... Speak clearly!" : placeholder}
        </p>
        
        {error && (
          <div className="p-3 bg-destructive-light text-destructive rounded-lg">
            <p className="text-sm font-medium">Oops! {error}</p>
            <p className="text-xs mt-1">Try speaking louder and clearer.</p>
          </div>
        )}

        {transcript && (
          <div className="p-4 bg-card border-2 border-primary rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm font-medium">You said:</span>
            </div>
            <p className="text-lg font-medium text-card-foreground">
              "{transcript}"
            </p>
            
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleAcceptTranscript}
                variant="default"
                size="sm"
                className="bg-success text-success-foreground hover:bg-success/90"
              >
                ✓ That's right!
              </Button>
              <Button
                onClick={handleRetryTranscript}
                variant="outline"
                size="sm"
              >
                🔄 Try again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};