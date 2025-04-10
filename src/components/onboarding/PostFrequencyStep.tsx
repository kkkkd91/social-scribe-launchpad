
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

const PostFrequencyStep = () => {
  const { nextStep, setPostFrequency, postFrequency } = useOnboarding();

  const handleSelectFrequency = (frequency: number) => {
    setPostFrequency(frequency);
    nextStep();
  };

  const frequencies = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">How often do you want to post per week?</h1>
      <p className="text-muted-foreground mb-8">We recommend posting at least 1-2 times per week.</p>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {frequencies.map((frequency) => (
          <Button
            key={frequency}
            variant={postFrequency === frequency ? "default" : "outline"}
            className={`h-12 w-12 rounded-md text-lg ${
              postFrequency === frequency ? "bg-primary" : ""
            }`}
            onClick={() => handleSelectFrequency(frequency)}
          >
            {frequency}
          </Button>
        ))}
      </div>

      <Button onClick={() => nextStep()} className="mt-4">
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default PostFrequencyStep;
