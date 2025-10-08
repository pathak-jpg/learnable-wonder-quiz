import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Volume2, RotateCcw } from "lucide-react";
import { QuizButton } from "./QuizButton";
import { VoiceInput } from "./VoiceInput";
import { useAccessibility } from "@/hooks/useAccessibility";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  type: "multiple-choice" | "voice-input";
  audioDescription?: string;
}

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number, isCorrect: boolean) => void;
  onVoiceAnswer: (answer: string, isCorrect: boolean) => void;
  className?: string;
}

export const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onVoiceAnswer,
  className
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [inputMode, setInputMode] = useState<'touch' | 'voice'>('touch');
  const { speak, playOptionSound, playAudioCue, vibrate } = useAccessibility();

  const progress = (questionNumber / totalQuestions) * 100;

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsAnswered(false);
    setInputMode('touch');
  }, [question.id]);

  useEffect(() => {
    // Announce the question when component mounts
    const announcement = `Question ${questionNumber} of ${totalQuestions}. ${question.question}`;
    speak(announcement, { rate: 0.7 });
    
    // If multiple choice, announce options
    if (question.type === "multiple-choice") {
      setTimeout(() => {
        speak("Here are your options:", { rate: 0.8 });
        question.options.forEach((option, index) => {
          setTimeout(() => {
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
            speak(`Option ${optionLetter}: ${option}`, { rate: 0.8 });
          }, (index + 1) * 1500);
        });
      }, 2000);
    }
  }, [question, questionNumber, totalQuestions, speak]);

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(optionIndex);
    const optionLetter = String.fromCharCode(65 + optionIndex);
    
    // Play unique haptic and sound for each option
    playOptionSound(optionIndex);
    speak(`You selected option ${optionLetter}: ${question.options[optionIndex]}`);

    // Show confirmation and process answer
    setTimeout(() => {
      const isCorrect = optionIndex === question.correctAnswer;
      setIsAnswered(true);
      setShowFeedback(true);
      
      if (isCorrect) {
        speak("Excellent! That's correct! Well done!", { pitch: 1.3 });
        playAudioCue({ type: 'success' });
      } else {
        speak("Not quite right, but that's okay! Keep trying, you're doing great!", { pitch: 1.1 });
        playAudioCue({ type: 'error' });
      }

      vibrate(200); // Single buzz confirmation after answer is processed

      onAnswer(optionIndex, isCorrect);
    }, 1000);
  };

  const handleVoiceAnswer = (transcript: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    
    // Simple answer matching - could be enhanced with AI/NLP
    const normalizedTranscript = transcript.toLowerCase().trim();
    let isCorrect = false;
    
    // Check if voice answer matches any option or correct answer
    if (question.type === "multiple-choice") {
      // Check if user said an option letter (e.g., "option c", "c", "see")
      const optionLetterMatch = normalizedTranscript.match(/option\s*([a-d])|^([a-d])$|^([a-d])\s/i);
      if (optionLetterMatch) {
        const spokenLetter = (optionLetterMatch[1] || optionLetterMatch[2] || optionLetterMatch[3]).toLowerCase();
        const spokenIndex = spokenLetter.charCodeAt(0) - 97; // Convert 'a' to 0, 'b' to 1, etc.
        isCorrect = spokenIndex === question.correctAnswer;
      } else {
        // Fallback: Check if the answer text matches
        const correctOption = question.options[question.correctAnswer].toLowerCase();
        isCorrect = correctOption.includes(normalizedTranscript) || 
                    normalizedTranscript.includes(correctOption);
      }
    }
    
    setShowFeedback(true);
    
    if (isCorrect) {
      speak("Fantastic! Your answer is correct!", { pitch: 1.3 });
      playAudioCue({ type: 'success' });
    } else {
      speak("Good try! Let's keep learning together!", { pitch: 1.1 });
      playAudioCue({ type: 'error' });
    }

    onVoiceAnswer(transcript, isCorrect);
  };

  const handleRepeatQuestion = () => {
    speak(question.question, { rate: 0.7 });
    playAudioCue({ type: 'navigation' });
  };

  const handleToggleInputMode = () => {
    const newMode = inputMode === 'touch' ? 'voice' : 'touch';
    setInputMode(newMode);
    speak(newMode === 'voice' ? "Voice input mode activated" : "Touch input mode activated");
    playAudioCue({ type: 'navigation' });
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-6", className)}>
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Question Card */}
      <Card className="p-8 bg-card border-2 border-border shadow-lg">
        <div className="space-y-6">
          {/* Question Header */}
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-card-foreground leading-relaxed">
                {question.question}
              </h2>
              {question.audioDescription && (
                <p className="text-lg text-muted-foreground mt-2">
                  {question.audioDescription}
                </p>
              )}
            </div>
            <Button
              onClick={handleRepeatQuestion}
              variant="outline"
              size="lg"
              className="p-4"
              aria-label="Repeat question"
            >
              <Volume2 className="w-6 h-6" />
            </Button>
          </div>

          {/* Input Mode Toggle */}
          <div className="flex justify-center">
            <Button
              onClick={handleToggleInputMode}
              variant="outline"
              className="text-lg py-3 px-6"
            >
              {inputMode === 'touch' ? '🎤 Switch to Voice' : '👆 Switch to Touch'}
            </Button>
          </div>

          {/* Answer Interface */}
          {inputMode === 'touch' && question.type === "multiple-choice" ? (
            <div className="grid gap-4 md:grid-cols-2">
              {question.options.map((option, index) => {
                const optionLetter = String.fromCharCode(65 + index);
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                
                return (
                  <QuizButton
                    key={index}
                    variant="option"
                    size="large"
                    onClick={() => handleOptionSelect(index)}
                    disabled={isAnswered}
                    optionLetter={optionLetter}
                    isActive={isSelected}
                    audioLabel={`Option ${optionLetter}: ${option}`}
                    onAudioPlay={() => speak(`Option ${optionLetter}: ${option}`)}
                    className={cn(
                      showFeedback && isSelected && isCorrect && "border-success bg-success-light celebrate",
                      showFeedback && isSelected && !isCorrect && "border-destructive bg-destructive-light gentle-shake"
                    )}
                  >
                    {option}
                  </QuizButton>
                );
              })}
            </div>
          ) : (
            <VoiceInput
              onTranscript={handleVoiceAnswer}
              placeholder="🎤 Tap the microphone and say your answer"
            />
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className="text-center">
              <div className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-bold",
                selectedAnswer === question.correctAnswer 
                  ? "bg-success-light text-success border border-success" 
                  : "bg-warning-light text-warning border border-warning"
              )}>
                {selectedAnswer === question.correctAnswer ? "🎉 Excellent!" : "💪 Keep trying!"}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};