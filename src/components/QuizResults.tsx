import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, RotateCcw, Home } from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";
import { Question } from "@/data/sampleQuestions";
import celebrationStars from "@/assets/celebration-stars.png";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface QuizAnswer {
  questionId: string;
  selectedAnswer: number | string;
  isCorrect: boolean;
  timeSpent: number;
}

interface QuizResultsProps {
  answers: QuizAnswer[];
  questions: Question[];
  onRetry?: () => void;
  onHome?: () => void;
}

export const QuizResults = ({ answers, questions, onRetry, onHome }: QuizResultsProps) => {
  const { speak, playAudioCue } = useAccessibility();
  
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  const averageTime = Math.round(answers.reduce((sum, answer) => sum + answer.timeSpent, 0) / answers.length / 1000);

  // Determine performance level and feedback
  const getPerformanceData = () => {
    if (scorePercentage >= 90) {
      return {
        level: "Excellent!",
        message: "Outstanding work! You're a star learner!",
        emoji: "🌟",
        color: "text-success",
        bgColor: "bg-success-light"
      };
    } else if (scorePercentage >= 70) {
      return {
        level: "Great Job!",
        message: "Well done! You're learning so well!",
        emoji: "🎉",
        color: "text-primary",
        bgColor: "bg-primary/10"
      };
    } else if (scorePercentage >= 50) {
      return {
        level: "Good Effort!",
        message: "Nice try! Keep practicing and you'll get even better!",
        emoji: "💪",
        color: "text-warning",
        bgColor: "bg-warning-light"
      };
    } else {
      return {
        level: "Keep Learning!",
        message: "That's okay! Every question helps you learn something new!",
        emoji: "📚",
        color: "text-accent",
        bgColor: "bg-accent/20"
      };
    }
  };

  const performance = getPerformanceData();

  // Announce results when component loads
  useEffect(() => {
    const announcement = `Quiz complete! You got ${correctAnswers} out of ${totalQuestions} questions correct. That's ${scorePercentage} percent! ${performance.message}`;
    setTimeout(() => speak(announcement, { rate: 0.8, pitch: 1.2 }), 1000);
    
    if (scorePercentage >= 70) {
      playAudioCue({ type: 'success' });
    } else {
      playAudioCue({ type: 'navigation' });
    }
  }, [correctAnswers, totalQuestions, scorePercentage, performance.message, speak, playAudioCue]);

  const handleRetry = () => {
    speak("Starting a new quiz! Get ready to learn more!");
    playAudioCue({ type: 'navigation' });
    onRetry?.();
  };

  const handleHome = () => {
    speak("Going back to the main menu!");
    playAudioCue({ type: 'navigation' });
    onHome?.();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Celebration Header */}
      <div className="text-center relative">
        <img 
          src={celebrationStars}
          alt="Celebration stars"
          className="w-32 h-32 mx-auto animate-bounce"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-2">
          Quiz Complete! 
        </h1>
        <p className="text-xl text-muted-foreground">
          Let's see how you did!
        </p>
      </div>

      {/* Main Results Card */}
      <Card className="p-8 space-y-8">
        {/* Score Display */}
        <div className="text-center space-y-4">
          <div className={cn(
            "inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-2xl font-bold",
            performance.bgColor,
            performance.color
          )}>
            <span className="text-3xl">{performance.emoji}</span>
            {performance.level}
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              {correctAnswers} out of {totalQuestions}
            </h2>
            <p className="text-xl text-muted-foreground">
              {performance.message}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Your Score</span>
            <span className="text-lg font-bold text-primary">
              {scorePercentage}%
            </span>
          </div>
          <Progress value={scorePercentage} className="h-4" />
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-muted rounded-xl">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground">{correctAnswers}</div>
            <div className="text-sm text-muted-foreground">Correct Answers</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-xl">
            <Star className="w-8 h-8 mx-auto mb-2 text-warning" />
            <div className="text-2xl font-bold text-foreground">{scorePercentage}%</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-xl">
            <div className="text-2xl mx-auto mb-2">⏱️</div>
            <div className="text-2xl font-bold text-foreground">{averageTime}s</div>
            <div className="text-sm text-muted-foreground">Avg. Time</div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground mb-4">Question Review</h3>
          <div className="space-y-3">
            {questions.map((question, index) => {
              const answer = answers[index];
              const isCorrect = answer?.isCorrect;
              
              return (
                <div 
                  key={question.id}
                  className={cn(
                    "p-4 rounded-lg border-2",
                    isCorrect 
                      ? "border-success bg-success-light" 
                      : "border-warning bg-warning-light"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold",
                      isCorrect ? "bg-success" : "bg-warning"
                    )}>
                      {isCorrect ? "✓" : "?"}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        Q{index + 1}: {question.question}
                      </p>
                      {question.type === "multiple-choice" && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleRetry}
            size="lg"
            className="btn-primary-quiz text-primary-foreground text-xl py-4 px-8"
          >
            <RotateCcw className="w-6 h-6 mr-3" />
            Try Another Quiz
          </Button>
          <Button
            onClick={handleHome}
            variant="outline"
            size="lg"
            className="text-xl py-4 px-8 border-2"
          >
            <Home className="w-6 h-6 mr-3" />
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};