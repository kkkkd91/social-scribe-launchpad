
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

const LanguageSelectionStep = () => {
  const { nextStep, setLanguage, language } = useOnboarding();

  const handleSelectLanguage = (selectedLanguage: "english" | "german") => {
    setLanguage(selectedLanguage);
    nextStep();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">Choose the language of your content</h1>
      <p className="text-muted-foreground mb-8">
        SocialScribe is in English but you can answer all questions in your chosen language at all times.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <Card
          className={`p-8 cursor-pointer border-2 hover:border-primary transition-colors ${
            language === "english" ? "border-primary" : ""
          }`}
          onClick={() => handleSelectLanguage("english")}
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="h-6 w-10 rounded overflow-hidden">
                <div className="bg-blue-700 h-2"></div>
                <div className="bg-white h-2"></div>
                <div className="bg-red-600 h-2"></div>
              </div>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">English</h3>
              <p className="text-sm text-muted-foreground">
                Recommended for most users to reach larger audience.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className={`h-5 w-5 rounded-full border-2 ${language === "english" ? "border-primary" : "border-gray-300 dark:border-gray-600"}`}>
                {language === "english" && (
                  <div className="h-3 w-3 bg-primary rounded-full m-0.5"></div>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card
          className={`p-8 cursor-pointer border-2 hover:border-primary transition-colors ${
            language === "german" ? "border-primary" : ""
          }`}
          onClick={() => handleSelectLanguage("german")}
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="h-6 w-10 rounded overflow-hidden">
                <div className="bg-black h-2"></div>
                <div className="bg-red-600 h-2"></div>
                <div className="bg-yellow-400 h-2"></div>
              </div>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">German</h3>
              <p className="text-sm text-muted-foreground">
                Recommended if your main audience is German.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className={`h-5 w-5 rounded-full border-2 ${language === "german" ? "border-primary" : "border-gray-300 dark:border-gray-600"}`}>
                {language === "german" && (
                  <div className="h-3 w-3 bg-primary rounded-full m-0.5"></div>
                )}
              </div>
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

export default LanguageSelectionStep;
