import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight } from "lucide-react";

const WorkspaceNameStep = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  
  const { workspaceType, userInfo, nextStep, setWorkspaceName: setContextWorkspaceName } = useOnboarding();
  const { user } = useAuth();

  useEffect(() => {
    const firstName = userInfo.firstName || user?.firstName || "My";
    // Set default workspace name based on type
    if (workspaceType === "individual") {
      setWorkspaceName(`${firstName}'s Workspace`);
    } else {
      setWorkspaceName(`${firstName}'s Team`);
    }
  }, [workspaceType, userInfo, user]);

  const handleContinue = () => {
    if (!workspaceName.trim()) return;
    setContextWorkspaceName(workspaceName);
    nextStep();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">
        Create a new {workspaceType === "team" ? "team" : "personal"} workspace
      </h1>
      <p className="text-muted-foreground mb-8">
        Name your workspace to get started.
      </p>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="space-y-2 text-left">
          <Label htmlFor="workspaceName">Workspace name</Label>
          <Input
            id="workspaceName"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            placeholder="Enter workspace name"
            required
            className="bg-background/50"
          />
        </div>

        <Button
          onClick={handleContinue}
          className="w-full mt-8 py-6 bg-primary hover:bg-primary/90 text-white"
          disabled={!workspaceName.trim()}
        >
          Continue{" "}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceNameStep; 