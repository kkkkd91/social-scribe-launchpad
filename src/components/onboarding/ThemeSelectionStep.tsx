import { ArrowRight, SunIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeSelectionStep = () => {
  const { nextStep, setPreferredTheme } = useOnboarding();
  const { setTheme } = useTheme();

  const handleContinue = () => {
    // Always set light theme
    setPreferredTheme("light");
    setTheme("light");
    nextStep();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">App Theme</h1>
      <p className="text-muted-foreground mb-8">This application uses a light theme for optimal readability.</p>

      <div className="flex justify-center">
        <Card
          className="p-8 cursor-pointer border-2 border-primary"
        >
          <div className="flex flex-col items-center">
            <div className="mb-4 p-4 bg-white border rounded-md">
              <img 
                src="/lovable-uploads/5b13ef54-339f-4161-b856-6ca56083fde7.png" 
                alt="Light theme preview" 
                className="w-full" 
              />
            </div>
            <div className="flex items-center text-lg font-medium">
              <SunIcon className="mr-2 h-5 w-5" />
              Light Theme
            </div>
          </div>
        </Card>
      </div>

      <Button 
        onClick={handleContinue} 
        className="mt-8"
      >
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ThemeSelectionStep;
