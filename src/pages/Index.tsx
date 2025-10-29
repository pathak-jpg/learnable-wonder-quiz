import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Heart, Users, Award, Eye, BookOpen } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";
import mascotOwl from "@/assets/mascot-owl.png";

const Index = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  const handleTeacherDashboard = () => {
    navigate("/teacher");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Teacher Dashboard Link */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleTeacherDashboard}
          variant="outline"
          size="lg"
          className="gap-2 shadow-lg"
        >
          <BookOpen className="w-5 h-5" />
          Teacher Dashboard
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center space-y-12 max-w-6xl">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-6">
              <img 
                src={mascotOwl}
                alt="LearnAble friendly owl mascot"
                className="w-20 h-20 animate-bounce"
              />
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="text-primary">Learn</span>
                <span className="text-accent">Able</span>
              </h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground">
              Inclusive Education for Every Child
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A specially designed learning platform for visually impaired children in Classes 1-5, 
              featuring voice guidance, haptic feedback, and adaptive technology that makes learning 
              accessible, engaging, and joyful for everyone.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <img 
                src={heroIllustration}
                alt="Diverse children learning together in an inclusive educational environment"
                className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
              />
            </div>
            
            <div className="flex-1 space-y-8">
              <Button
                onClick={handleStartQuiz}
                size="lg"
                className="btn-primary-quiz text-primary-foreground text-3xl py-12 px-16 w-full max-w-md"
              >
                🚀 Start Learning Adventure!
              </Button>
              
              <p className="text-lg text-muted-foreground">
                Designed with love for children who learn differently
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Children Love LearnAble
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every feature is carefully designed to support different learning needs and abilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">🎵</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Voice Guided</h3>
              <p className="text-muted-foreground leading-relaxed">
                Crystal-clear voice guidance reads every question and option aloud with child-friendly tones
              </p>
            </Card>

            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Multi-Input</h3>
              <p className="text-muted-foreground leading-relaxed">
                Answer by touch, voice, or both - the app adapts to how each child learns best
              </p>
            </Card>

            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Encouraging</h3>
              <p className="text-muted-foreground leading-relaxed">
                Positive reinforcement and celebration for every attempt, building confidence and joy
              </p>
            </Card>

            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <GraduationCap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Adaptive</h3>
              <p className="text-muted-foreground leading-relaxed">
                High contrast visuals, large fonts, and haptic feedback for different accessibility needs
              </p>
            </Card>

            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Eye className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Braille Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                Compatible with refreshable braille displays for tactile learning experience
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              LearnAble uses cutting-edge artificial intelligence to create a truly accessible learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-primary">Speech Technology</h3>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>• Text-to-Speech with natural child-friendly voices</li>
                <li>• Speech recognition for voice answers</li>
                <li>• Audio cues and sound patterns for navigation</li>
                <li>• Multilingual support for diverse learners</li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-success">Adaptive Interface</h3>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>• High contrast and large text options</li>
                <li>• Haptic feedback patterns for confirmation</li>
                <li>• Customizable accessibility settings</li>
                <li>• Cross-platform mobile and tablet support</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of children who are discovering the joy of accessible learning
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button
              onClick={handleStartQuiz}
              size="lg"
              className="btn-primary-quiz text-primary-foreground text-2xl py-8 px-12"
            >
              🌟 Begin Your Journey
            </Button>
          </div>
          
          <p className="text-muted-foreground">
            Free to use • No signup required • Works on all devices
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
