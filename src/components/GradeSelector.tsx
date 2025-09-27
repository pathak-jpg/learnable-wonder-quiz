import { Card } from "@/components/ui/card";
import { QuizButton } from "./QuizButton";
import { useAccessibility } from "@/hooks/useAccessibility";
import { GraduationCap } from "lucide-react";

interface GradeSelectorProps {
  onGradeSelect: (grade: number) => void;
  selectedGrade?: number;
}

export const GradeSelector = ({ onGradeSelect, selectedGrade }: GradeSelectorProps) => {
  const { speak, playAudioCue } = useAccessibility();

  const grades = [
    { number: 1, label: "Grade 1", description: "Ages 6-7: Basic counting and letters" },
    { number: 2, label: "Grade 2", description: "Ages 7-8: Simple addition and reading" },
    { number: 3, label: "Grade 3", description: "Ages 8-9: Multiplication and writing" },
    { number: 4, label: "Grade 4", description: "Ages 9-10: Division and science facts" },
    { number: 5, label: "Grade 5", description: "Ages 10-11: Fractions and geography" }
  ];

  const handleGradeSelect = (grade: number) => {
    onGradeSelect(grade);
    speak(`You selected ${grades.find(g => g.number === grade)?.label}. Great choice! Let's start learning!`);
    playAudioCue({ type: 'selection' });
  };

  return (
    <Card className="p-8 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-full">
            <GraduationCap className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          Choose Your Grade Level
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select your grade to get questions that are just right for you!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
        {grades.map((grade) => (
          <QuizButton
            key={grade.number}
            variant={selectedGrade === grade.number ? "primary" : "option"}
            size="large"
            onClick={() => handleGradeSelect(grade.number)}
            className="flex-col items-center text-center p-6 h-auto min-h-[140px]"
            audioLabel={`${grade.label}: ${grade.description}`}
            onAudioPlay={() => speak(`${grade.label}: ${grade.description}`)}
          >
            <div className="text-4xl font-bold mb-2">{grade.number}</div>
            <div className="text-xl font-bold mb-2">{grade.label}</div>
            <div className="text-sm opacity-80 leading-relaxed">
              {grade.description}
            </div>
          </QuizButton>
        ))}
      </div>

      {selectedGrade && (
        <div className="text-center">
          <p className="text-lg text-primary font-medium">
            ✓ Grade {selectedGrade} selected! Ready to start your quiz?
          </p>
        </div>
      )}
    </Card>
  );
};