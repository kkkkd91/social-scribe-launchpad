
import { cn } from "@/lib/utils";

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressSteps = ({ currentStep, totalSteps, className }: ProgressStepsProps) => {
  return (
    <div className={cn("flex justify-center gap-2 mt-6", className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 w-2 rounded-full transition-all duration-300",
            index + 1 === currentStep 
              ? "bg-primary w-3" 
              : index + 1 < currentStep 
                ? "bg-primary/60" 
                : "bg-gray-300 dark:bg-gray-700"
          )}
        />
      ))}
    </div>
  );
};

export default ProgressSteps;
