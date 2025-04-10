
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

const WorkspaceTypeStep = () => {
  const { nextStep, setWorkspaceType, workspaceType } = useOnboarding();

  const handleSelectType = (type: "team" | "individual") => {
    setWorkspaceType(type);
    nextStep();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">How would you like to use SocialScribe?</h1>
      <p className="text-muted-foreground mb-8">We'll setup your workspace accordingly.</p>

      <div className="grid md:grid-cols-2 gap-4">
        <Card
          className={`p-8 cursor-pointer border border-gray-700 bg-gray-900/50 hover:border-indigo-500 transition-colors ${
            workspaceType === "team" ? "border-indigo-500 ring-1 ring-indigo-500" : ""
          }`}
          onClick={() => handleSelectType("team")}
        >
          <div className="flex flex-col items-center">
            <div className="mb-6 h-36 w-full flex items-center justify-center">
              <img 
                src="/lovable-uploads/0346ed8a-8244-4c5f-b8ab-878a10058dd5.png" 
                alt="Team workspace illustration" 
                className="max-h-full" 
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">For my team</h2>
            <p className="text-muted-foreground text-center">
              One place to create, review and track content for your team.
            </p>
          </div>
        </Card>

        <Card
          className={`p-8 cursor-pointer border border-gray-700 bg-gray-900/50 hover:border-indigo-500 transition-colors ${
            workspaceType === "individual" ? "border-indigo-500 ring-1 ring-indigo-500" : ""
          }`}
          onClick={() => handleSelectType("individual")}
        >
          <div className="flex flex-col items-center">
            <div className="mb-6 h-36 w-full flex items-center justify-center">
              <img 
                src="/lovable-uploads/96393a72-cbfe-489b-8611-6452d2164a01.png" 
                alt="Individual workspace illustration" 
                className="max-h-full" 
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">For personal use</h2>
            <p className="text-muted-foreground text-center">
              Create content for a single LinkedIn profile.
            </p>
          </div>
        </Card>
      </div>

      <Button 
        onClick={() => nextStep()} 
        className="mt-8 bg-indigo-600 hover:bg-indigo-700"
      >
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default WorkspaceTypeStep;
