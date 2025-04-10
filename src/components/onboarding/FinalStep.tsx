
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
  const [workspaceName, setWorkspaceName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  
  const { workspaceType, userInfo } = useOnboarding();
  const { completeOnboarding } = useAuth();
  const { createWorkspace } = useWorkspace();
  const navigate = useNavigate();

  useEffect(() => {
    // Set default workspace name based on type and user info
    if (workspaceType === "individual") {
      setWorkspaceName(`${userInfo.firstName}'s Workspace`);
    } else {
      setWorkspaceName(`${userInfo.firstName}'s Team`);
    }
  }, [workspaceType, userInfo]);

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
        Create a new {workspaceType === "team" ? "team" : "personal"} workspace
      </h1>
      <p className="text-muted-foreground mb-8">
        Workspaces are shared environments where teams can work on content production, strategy and analytics together.
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
            className="bg-background/50 border-gray-700"
          />
        </div>

        <Button
          onClick={handleCreateWorkspace}
          className="w-full mt-8 py-6 bg-indigo-600 hover:bg-indigo-700"
          disabled={isCreating || !workspaceName.trim()}
        >
          {isCreating ? "Creating workspace..." : "Create workspace"}{" "}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FinalStep;
