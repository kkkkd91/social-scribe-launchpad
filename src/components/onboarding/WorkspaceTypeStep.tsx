
import { ArrowRight, Users, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { motion } from "framer-motion";

const WorkspaceTypeStep = () => {
  const { nextStep, setWorkspaceType, workspaceType } = useOnboarding();

  const handleSelectType = (type: "team" | "individual") => {
    setWorkspaceType(type);
    nextStep();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2 gradient-text">How would you like to use SocialScribe?</h1>
      <p className="text-muted-foreground mb-8">We'll setup your workspace accordingly.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card
          className={`p-8 cursor-pointer border-2 hover:border-brand-purple transition-all duration-300 hover:shadow-lg ${
            workspaceType === "team" ? "border-brand-purple ring-1 ring-brand-purple" : "border-transparent"
          }`}
          onClick={() => handleSelectType("team")}
        >
          <div className="flex flex-col items-center">
            <div className="mb-6 h-36 w-full flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-brand-purple/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Users className="h-20 w-20 text-brand-purple animate-float" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-brand-purple">For my team</h2>
            <p className="text-muted-foreground text-center">
              One place to create, review and track content for your team.
            </p>
          </div>
        </Card>

        <Card
          className={`p-8 cursor-pointer border-2 hover:border-brand-teal transition-all duration-300 hover:shadow-lg ${
            workspaceType === "individual" ? "border-brand-teal ring-1 ring-brand-teal" : "border-transparent"
          }`}
          onClick={() => handleSelectType("individual")}
        >
          <div className="flex flex-col items-center">
            <div className="mb-6 h-36 w-full flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-brand-teal/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <User className="h-20 w-20 text-brand-teal animate-float" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-brand-teal">For personal use</h2>
            <p className="text-muted-foreground text-center">
              Create content for a single LinkedIn profile.
            </p>
          </div>
        </Card>
      </div>

      <Button 
        onClick={() => nextStep()} 
        className="mt-8 gradient-bg hover:opacity-90 animate-pulse-subtle"
      >
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default WorkspaceTypeStep;
