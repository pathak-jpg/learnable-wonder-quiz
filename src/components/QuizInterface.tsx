import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResults } from "./QuizResults";
import { sampleQuestions, getRandomFeedback, Question } from "@/data/sampleQuestions";
import { useAccessibility } from "@/hooks/useAccessibility";

interface QuizAnswer {
  questionId: string;
  selectedAnswer: number | string;
  isCorrect: boolean;
  timeSpent: number;
}

interface QuizInterfaceProps {
  selectedGrade?: number;
  onComplete?: (results: QuizAnswer[]) => void;
}

export const QuizInterface = ({ selectedGrade = 1, onComplete }: QuizInterfaceProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const { speak, playAudioCue } = useAccessibility();

  // Filter questions by grade
  const filteredQuestions = sampleQuestions.filter(q => q.grade === selectedGrade);
  const questions = filteredQuestions.slice(0, 5); // Limit to 5 questions per session
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const recordAnswer = useCallback((
    answerValue: number | string, 
    isCorrect: boolean
  ) => {
    const timeSpent = Date.now() - startTime;
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answerValue,
      isCorrect,
      timeSpent
    };

    setAnswers(prev => [...prev, newAnswer]);

    // Provide encouraging feedback
    const feedbackType = isCorrect ? 'correct' : 'incorrect';
    const feedback = getRandomFeedback(feedbackType);
    
    setTimeout(() => {
      speak(feedback, { pitch: isCorrect ? 1.3 : 1.1 });
      
      // Move to next question or complete quiz
      setTimeout(() => {
        if (isLastQuestion) {
          setIsQuizComplete(true);
          speak("Great job! You've completed all the questions. Let's see how you did!");
          onComplete?.([...answers, newAnswer]);
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
          setStartTime(Date.now());
          
          const nextQuestionNum = currentQuestionIndex + 2;
          speak(`Moving to question ${nextQuestionNum}. You're doing wonderfully!`);
        }
      }, 1500);
    }, 2000);
  }, [currentQuestion?.id, startTime, answers, isLastQuestion, onComplete, speak, currentQuestionIndex]);

  const handleMultipleChoiceAnswer = useCallback((
    answerIndex: number, 
    isCorrect: boolean
  ) => {
    recordAnswer(answerIndex, isCorrect);
  }, [recordAnswer]);

  const handleVoiceAnswer = useCallback((
    transcript: string, 
    isCorrect: boolean
  ) => {
    recordAnswer(transcript, isCorrect);
  }, [recordAnswer]);

  if (isQuizComplete) {
    return <QuizResults answers={answers} questions={questions} />;
  }

  if (!currentQuestion) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">No Questions Available</h2>
        <p className="text-lg text-muted-foreground">
          Sorry, we don't have questions for Grade {selectedGrade} yet.
        </p>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6">
      <QuizQuestion
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleMultipleChoiceAnswer}
        onVoiceAnswer={handleVoiceAnswer}
      />
    </div>
  );
};