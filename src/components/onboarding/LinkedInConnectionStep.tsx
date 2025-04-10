
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Linkedin } from "lucide-react";

const LinkedInConnectionStep = () => {
  const { nextStep } = useOnboarding();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">Connect your LinkedIn account</h1>
      <p className="text-muted-foreground mb-8">
        Connect your LinkedIn account to post directly from SocialScribe
      </p>

      <div className="max-w-md mx-auto space-y-6">
        <Button 
          onClick={() => {
            // This would typically trigger an OAuth flow
            // For now, we'll just simulate it being successful
            setTimeout(() => {
              nextStep();
            }, 1000);
          }}
          className="w-full py-6 bg-[#0A66C2] hover:bg-[#004182]"
        >
          <Linkedin className="mr-2 h-5 w-5" />
          Connect LinkedIn Account
        </Button>

        <div className="pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            We'll never post without your permission. You can disconnect at any time.
          </p>
          
          <Button 
            variant="outline" 
            onClick={() => nextStep()}
            className="mt-2"
          >
            Skip for now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinkedInConnectionStep;
