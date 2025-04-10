import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressSteps = ({ currentStep, totalSteps, className }: ProgressStepsProps) => {
  const { nextStep, prevStep, canNavigateBack } = useOnboarding();

  return (
    <div className={cn("mt-10", className)}>
      {/* Step indicators */}
      <div className="flex justify-center items-center gap-2 mb-6">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = index + 1 < currentStep;
          const isCurrent = index + 1 === currentStep;
          const stepNumber = index + 1;
          
          return (
            <div 
              key={index}
              className="flex flex-col items-center"
            >
              <div 
                className={cn(
                  "h-2 transition-all duration-300 relative mx-1",
                  isCurrent 
                    ? "w-10 bg-primary rounded-full" 
                    : isCompleted 
                      ? "w-6 bg-primary rounded-full" 
                      : "w-6 bg-gray-200 dark:bg-gray-700 rounded-full"
                )}
              >
                {isCompleted && (
                  <span className="absolute -top-1 -right-1 opacity-0 animate-fade-in" 
                        style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}>
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                  </span>
                )}
              </div>
              
              {isCurrent && (
                <span className="text-xs text-primary font-medium mt-2 opacity-0 animate-fade-in" 
                      style={{ animationDuration: '0.5s', animationFillMode: 'forwards' }}>
                  Step {stepNumber}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8 border-t border-border/40 pt-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevStep}
          disabled={currentStep === 1 || !canNavigateBack}
          className={cn(
            "text-muted-foreground hover:text-foreground hover:bg-primary/5",
            (currentStep === 1 || !canNavigateBack) && "opacity-0 pointer-events-none"
          )}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {currentStep < totalSteps && (
          <Button
            variant="ghost"
            size="sm"
            onClick={nextStep}
            className="ml-auto text-primary hover:text-primary hover:bg-primary/5"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProgressSteps;
