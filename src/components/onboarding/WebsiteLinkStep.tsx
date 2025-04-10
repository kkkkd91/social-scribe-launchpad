import { useState } from "react";
import { ArrowRight, Globe, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/contexts/OnboardingContext";

const WebsiteLinkStep = () => {
  const { nextStep, websiteLink, setWebsiteLink } = useOnboarding();
  const [inputValue, setInputValue] = useState(websiteLink);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWebsiteLink(inputValue);
    nextStep();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2 gradient-text">Add a website to scrape for content</h1>
      <p className="text-muted-foreground mb-8">
        We'll extract content from this website to help generate your LinkedIn posts
      </p>

      <div className="relative">
        <div className="absolute -top-16 -right-4 w-24 h-24 flex items-center justify-center animate-float opacity-30 pointer-events-none">
          <Globe className="h-full w-full text-coral" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="websiteUrl" className="text-left block">Website URL</Label>
            <div className="relative">
              <Input
                id="websiteUrl"
                type="url"
                placeholder="https://example.com"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pl-10 bg-background/50 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            This can be your company website, blog, or any site with content similar to what you want to post
          </p>
        </div>

        <Button 
          type="submit"
          className="mt-8 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default WebsiteLinkStep;
