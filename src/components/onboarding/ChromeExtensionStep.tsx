import { ArrowRight, Download, Chrome, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

const ChromeExtensionStep = () => {
  const { nextStep, setCurrentStep } = useOnboarding();

  const handleSkipClick = () => {
    console.log("Skip button clicked");
    // Try both methods to ensure navigation works
    nextStep();
    // Also try direct method as fallback
    setCurrentStep(8);
  };

  const handleInstallClick = () => {
    // Open Chrome Web Store in a new tab
    window.open("https://chrome.google.com/webstore/category/extensions", "_blank");
    // Optionally you can track this event
    console.log("Extension installation link clicked");
    // Also proceed to next step after clicking install
    nextStep();
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">Install the Chrome Extension</h1>
      <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
        Supercharge your LinkedIn experience with our browser extension for seamless content creation
      </p>

      <div className="max-w-xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Extension card */}
          <div className="flex-1 p-6 border border-primary/20 rounded-lg bg-primary/5 shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/30">
            <div className="flex items-center justify-center mb-4">
              <Chrome className="h-12 w-12 text-primary" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2">SocialScribe Extension</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Get one-click access to content generation right from LinkedIn
            </p>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white"
              onClick={handleInstallClick}
            >
              <Download className="mr-2 h-4 w-4" />
              Install Extension
            </Button>
          </div>
          
          {/* Benefits */}
          <div className="flex-1 flex flex-col justify-center text-left">
            <h4 className="font-medium mb-4 text-lg">Why install our extension?</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Generate content with one click while browsing LinkedIn</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Scrape profiles you like to inspire your content</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Post directly to LinkedIn without switching tabs</span>
              </li>
            </ul>
          </div>
        </div>

        <img 
          src="/lovable-uploads/extension-screenshot.png" 
          alt="Extension Screenshot" 
          className="rounded-lg shadow-lg mb-6 border border-border w-full max-w-xl mx-auto"
          onError={(e) => {e.currentTarget.style.display = 'none'}}
        />

        <div className="pt-4 flex justify-center">
          <Button 
            className="px-6 bg-primary/90 hover:bg-primary text-white"
            onClick={handleSkipClick}
          >
            Skip for now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChromeExtensionStep;
