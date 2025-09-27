import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Settings } from "lucide-react";
import { GradeSelector } from "@/components/GradeSelector";
import { QuizInterface } from "@/components/QuizInterface";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { useAccessibility } from "@/hooks/useAccessibility";
import heroIllustration from "@/assets/hero-illustration.png";
import mascotOwl from "@/assets/mascot-owl.png";

type QuizState = "home" | "grade-select" | "quiz" | "settings";

const Quiz = () => {
  const [currentState, setCurrentState] = useState<QuizState>("home");
  const [selectedGrade, setSelectedGrade] = useState<number | undefined>();
  const { speak, playAudioCue } = useAccessibility();

  const handleStartQuiz = () => {
    setCurrentState("grade-select");
    speak("Let's choose your grade level first!");
    playAudioCue({ type: 'navigation' });
  };

  const handleGradeSelect = (grade: number) => {
    setSelectedGrade(grade);
    setTimeout(() => {
      setCurrentState("quiz");
      speak(`Starting your Grade ${grade} quiz! Get ready to show what you know!`);
    }, 1500);
  };

  const handleQuizComplete = () => {
    setTimeout(() => {
      speak("Would you like to try another quiz or go back to the main menu?");
    }, 2000);
  };

  const handleBackToHome = () => {
    setCurrentState("home");
    setSelectedGrade(undefined);
    speak("Welcome back to LearnAble! Ready for another learning adventure?");
    playAudioCue({ type: 'navigation' });
  };

  const handleShowSettings = () => {
    setCurrentState("settings");
    speak("Here are your accessibility settings. You can customize how the app works for you!");
  };

  const renderContent = () => {
    switch (currentState) {
      case "grade-select":
        return (
          <div className="space-y-6">
            <Button
              onClick={handleBackToHome}
              variant="outline"
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <GradeSelector
              onGradeSelect={handleGradeSelect}
              selectedGrade={selectedGrade}
            />
            {selectedGrade && (
              <div className="text-center">
                <p className="text-lg mb-4">Ready to start your Grade {selectedGrade} quiz?</p>
                <Button
                  onClick={() => setCurrentState("quiz")}
                  size="lg"
                  className="btn-primary-quiz text-primary-foreground"
                >
                  Start Quiz! 🚀
                </Button>
              </div>
            )}
          </div>
        );

      case "quiz":
        return (
          <div className="space-y-6">
            <Button
              onClick={() => setCurrentState("grade-select")}
              variant="outline"
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Change Grade
            </Button>
            <QuizInterface
              selectedGrade={selectedGrade}
              onComplete={handleQuizComplete}
            />
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <Button
              onClick={handleBackToHome}
              variant="outline"
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <AccessibilityPanel />
          </div>
        );

      default:
        return (
          <div className="text-center space-y-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <img 
                src={heroIllustration}
                alt="Children learning together with inclusive education"
                className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
              />
              
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <img 
                    src={mascotOwl}
                    alt="Friendly owl mascot"
                    className="w-16 h-16"
                  />
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    LearnAble VIS
                  </h1>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                  Learning Made Accessible
                </h2>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  A specially designed quiz app for visually impaired children with voice guidance, 
                  haptic feedback, and encouraging support every step of the way!
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 text-center space-y-4">
                <div className="text-4xl">🎵</div>
                <h3 className="text-xl font-bold">Voice Guided</h3>
                <p className="text-muted-foreground">
                  Every question is read aloud with friendly, clear voices
                </p>
              </Card>
              
              <Card className="p-6 text-center space-y-4">
                <div className="text-4xl">📱</div>
                <h3 className="text-xl font-bold">Touch & Voice</h3>
                <p className="text-muted-foreground">
                  Answer by touching or speaking - choose what works best for you
                </p>
              </Card>
              
              <Card className="p-6 text-center space-y-4">
                <div className="text-4xl">🌟</div>
                <h3 className="text-xl font-bold">Encouraging</h3>
                <p className="text-muted-foreground">
                  Positive feedback and celebration for every effort you make
                </p>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleStartQuiz}
                size="lg"
                className="btn-primary-quiz text-primary-foreground text-2xl py-8 px-12"
              >
                🚀 Start Learning!
              </Button>
              
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleShowSettings}
                  variant="outline"
                  size="lg"
                  className="text-lg py-4 px-6"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Accessibility Settings
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Quiz;