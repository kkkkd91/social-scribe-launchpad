
import { useState } from "react";
import { ArrowRight } from "lucide-react";
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
      <h1 className="text-3xl font-bold mb-2">Add a website to scrape for content</h1>
      <p className="text-muted-foreground mb-8">
        We'll extract content from this website to help generate your LinkedIn posts
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="websiteUrl" className="text-left block">Website URL</Label>
            <Input
              id="websiteUrl"
              type="url"
              placeholder="https://example.com"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-background/50 border-gray-700"
            />
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            This can be your company website, blog, or any site with content similar to what you want to post
          </p>
        </div>

        <Button 
          type="submit"
          className="mt-8 bg-indigo-600 hover:bg-indigo-700"
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default WebsiteLinkStep;
