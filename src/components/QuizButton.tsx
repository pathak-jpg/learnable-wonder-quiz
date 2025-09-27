import { Button } from "@/components/ui/button";
import { Volume2, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "option";
  size?: "default" | "large" | "extra-large";
  disabled?: boolean;
  className?: string;
  audioLabel?: string;
  onAudioPlay?: () => void;
  isActive?: boolean;
  optionLetter?: string;
}

export const QuizButton = ({
  children,
  onClick,
  variant = "primary",
  size = "default",
  disabled = false,
  className,
  audioLabel,
  onAudioPlay,
  isActive = false,
  optionLetter,
}: QuizButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "btn-primary-quiz text-primary-foreground hover:shadow-lg";
      case "success":
        return "btn-success-quiz text-success-foreground hover:shadow-lg";
      case "option":
        return cn(
          "btn-option bg-card text-card-foreground border-2",
          isActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
        );
      default:
        return "bg-secondary text-secondary-foreground hover:bg-secondary-hover hover:shadow-lg";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "large":
        return "text-2xl py-8 px-10 min-h-[100px]";
      case "extra-large":
        return "text-3xl py-10 px-12 min-h-[120px]";
      default:
        return "text-xl py-6 px-8 min-h-[80px]";
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "btn-quiz font-bold rounded-2xl transition-all duration-300",
          "transform hover:scale-105 active:scale-95",
          "focus:ring-4 focus:ring-primary/30 focus:outline-none",
          getVariantClasses(),
          getSizeClasses(),
          className
        )}
        aria-label={audioLabel || (typeof children === 'string' ? children : undefined)}
      >
        {optionLetter && (
          <span className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full text-primary font-bold mr-4">
            {optionLetter}
          </span>
        )}
        <span className="flex-1 text-left">{children}</span>
        {audioLabel && onAudioPlay && (
          <Volume2 
            className="w-6 h-6 ml-4 opacity-70" 
            aria-hidden="true"
          />
        )}
      </Button>
      
      {/* Audio play button for screen readers and accessibility */}
      {audioLabel && onAudioPlay && (
        <Button
          onClick={onAudioPlay}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 p-2"
          aria-label={`Listen to: ${audioLabel}`}
        >
          <Volume2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};