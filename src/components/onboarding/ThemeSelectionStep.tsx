
import { ArrowRight, MoonIcon, SunIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeSelectionStep = () => {
  const { nextStep, setPreferredTheme, preferredTheme } = useOnboarding();
  const { setTheme } = useTheme();

  const handleSelectTheme = (theme: "light" | "dark") => {
    setPreferredTheme(theme);
    setTheme(theme);
    nextStep();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">Choose your style</h1>
      <p className="text-muted-foreground mb-8">You can change the UI style at any time in the settings.</p>

      <div className="grid md:grid-cols-2 gap-4">
        <Card
          className={`p-8 cursor-pointer border-2 hover:border-primary transition-colors ${
            preferredTheme === "light" ? "border-primary" : ""
          }`}
          onClick={() => handleSelectTheme("light")}
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
              Light
            </div>
          </div>
        </Card>

        <Card
          className={`p-8 cursor-pointer border-2 hover:border-primary transition-colors ${
            preferredTheme === "dark" ? "border-primary" : ""
          }`}
          onClick={() => handleSelectTheme("dark")}
        >
          <div className="flex flex-col items-center">
            <div className="mb-4 p-4 bg-gray-900 border rounded-md">
              <img 
                src="/lovable-uploads/1e0970f4-38c8-4ca3-8f11-c052d9163502.png" 
                alt="Dark theme preview" 
                className="w-full" 
              />
            </div>
            <div className="flex items-center text-lg font-medium">
              <MoonIcon className="mr-2 h-5 w-5" />
              Dark
            </div>
          </div>
        </Card>
      </div>

      <Button 
        onClick={() => nextStep()} 
        className="mt-8"
      >
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ThemeSelectionStep;
