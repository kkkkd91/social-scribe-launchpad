
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

const ChromeExtensionStep = () => {
  const { nextStep } = useOnboarding();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">Install the Chrome Extension</h1>
      <p className="text-muted-foreground mb-8">
        Enhance your experience with our browser extension for LinkedIn
      </p>

      <div className="max-w-md mx-auto space-y-6">
        <div className="p-6 border border-gray-700 rounded-lg bg-black/30">
          <img 
            src="/lovable-uploads/b42b2ecd-7a27-4c5b-bb79-1e79ece4a9de.png" 
            alt="Chrome Extension" 
            className="h-32 mx-auto mb-4" 
          />
          
          <h3 className="text-xl font-semibold mb-2">SocialScribe Extension</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get one-click access to content generation right from LinkedIn
          </p>
          
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Install Extension
          </Button>
        </div>

        <div className="pt-4">
          <Button 
            variant="outline" 
            onClick={() => nextStep()}
          >
            Skip for now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChromeExtensionStep;
