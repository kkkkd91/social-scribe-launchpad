
import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressSteps = ({ currentStep, totalSteps, className }: ProgressStepsProps) => {
  return (
    <div className={cn("flex justify-center gap-3 mt-8", className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 rounded-full transition-all duration-500 relative",
            index + 1 === currentStep 
              ? "w-6 bg-gradient-to-r from-brand-teal to-brand-purple" 
              : index + 1 < currentStep 
                ? "w-4 bg-brand-teal" 
                : "w-3 bg-gray-300 dark:bg-gray-700"
          )}
        >
          {index + 1 < currentStep && (
            <span className="absolute -top-1 -right-1 opacity-0 animate-fade-in" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}>
              <CheckCheck className="w-3 h-3 text-brand-teal" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
