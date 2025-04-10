
import { useState } from "react";
import { ArrowRight, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";

const InspirationProfilesStep = () => {
  const { nextStep, inspirationProfiles, addInspirationProfile, removeInspirationProfile } = useOnboarding();
  const [inputValue, setInputValue] = useState("");

  const handleAddProfile = () => {
    if (inputValue.trim()) {
      addInspirationProfile(inputValue.trim());
      setInputValue("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addInspirationProfile(inputValue.trim());
    }
    nextStep();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">Which LinkedIn profiles inspire you?</h1>
      <p className="text-muted-foreground mb-8">
        Add LinkedIn profiles whose content style you'd like to emulate
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="https://linkedin.com/in/username"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-background/50 border-gray-700"
          />
          <Button 
            type="button" 
            onClick={handleAddProfile}
            className="shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {inspirationProfiles.length > 0 && (
          <div className="space-y-2 mb-6">
            <p className="text-sm font-medium text-left">Added profiles:</p>
            <div className="bg-black/20 rounded-lg p-2 max-h-40 overflow-y-auto">
              {inspirationProfiles.map((profile, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-800/50 rounded px-3 py-2 mb-2">
                  <span className="text-sm truncate">{profile}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeInspirationProfile(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button 
          type="submit"
          className="mt-4 bg-indigo-600 hover:bg-indigo-700"
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default InspirationProfilesStep;
