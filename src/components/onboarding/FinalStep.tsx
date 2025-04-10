import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { ArrowRight } from "lucide-react";

const FinalStep = () => {
  const [isCreating, setIsCreating] = useState(false);
  
  const { workspaceType, workspaceName } = useOnboarding();
  const { completeOnboarding } = useAuth();
  const { createWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) return;
    
    setIsCreating(true);
    
    try {
      // Create the workspace
      await createWorkspace(workspaceName, workspaceType || "individual");
      
      // Mark onboarding as complete
      completeOnboarding();
      
      // Navigate to celebration page
      navigate("/celebrate");
    } catch (error) {
      console.error("Error creating workspace:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">
        Complete Your Setup
      </h1>
      <p className="text-muted-foreground mb-8">
        You're all set! Click below to complete the setup process and launch your workspace.
      </p>

      <div className="p-6 border-2 border-primary/20 rounded-lg mb-8 mx-auto max-w-md">
        <h3 className="font-semibold text-xl text-primary mb-2">Your Workspace</h3>
        <p className="text-muted-foreground mb-2">
          Type: <span className="font-medium">{workspaceType === "team" ? "Team" : "Personal"}</span>
        </p>
        <p className="text-muted-foreground">
          Name: <span className="font-medium">{workspaceName}</span>
        </p>
      </div>

      <Button
        onClick={handleCreateWorkspace}
        className="w-full max-w-md mx-auto py-6 bg-primary hover:bg-primary/90 text-white"
        disabled={isCreating}
      >
        {isCreating ? "Setting up workspace..." : "Complete Setup & Launch Workspace"}{" "}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default FinalStep;
