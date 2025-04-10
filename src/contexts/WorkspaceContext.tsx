import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/lib/toast";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "writer" | "viewer";
}

export interface Workspace {
  id: string;
  name: string;
  type: "team" | "individual";
  members?: TeamMember[];
  createdAt: string;
}

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  createWorkspace: (name: string, type: "team" | "individual") => Promise<Workspace>;
  switchWorkspace: (workspaceId: string) => void;
  inviteTeamMember: (workspaceId: string, email: string, role: "admin" | "writer" | "viewer") => Promise<boolean>;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
  workspaces: [],
  currentWorkspace: null,
  createWorkspace: async () => ({ id: "", name: "", type: "individual", createdAt: "" }),
  switchWorkspace: () => {},
  inviteTeamMember: async () => false,
});

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);

  useEffect(() => {
    const savedWorkspaces = localStorage.getItem("socialScribe_workspaces");
    const savedCurrentWorkspaceId = localStorage.getItem("socialScribe_currentWorkspace");
    
    if (savedWorkspaces) {
      const parsedWorkspaces = JSON.parse(savedWorkspaces);
      setWorkspaces(parsedWorkspaces);
      
      if (savedCurrentWorkspaceId) {
        const currentWs = parsedWorkspaces.find(
          (ws: Workspace) => ws.id === savedCurrentWorkspaceId
        );
        if (currentWs) setCurrentWorkspace(currentWs);
      }
    }
  }, []);

  const createWorkspace = async (name: string, type: "team" | "individual"): Promise<Workspace> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newWorkspace: Workspace = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      type,
      members: type === "team" ? [] : undefined,
      createdAt: new Date().toISOString(),
    };
    
    const updatedWorkspaces = [...workspaces, newWorkspace];
    setWorkspaces(updatedWorkspaces);
    setCurrentWorkspace(newWorkspace);
    
    localStorage.setItem("socialScribe_workspaces", JSON.stringify(updatedWorkspaces));
    localStorage.setItem("socialScribe_currentWorkspace", newWorkspace.id);
    
    toast.success(`Workspace "${name}" created successfully`);
    return newWorkspace;
  };

  const switchWorkspace = (workspaceId: string) => {
    const workspace = workspaces.find((ws) => ws.id === workspaceId);
    if (workspace) {
      setCurrentWorkspace(workspace);
      localStorage.setItem("socialScribe_currentWorkspace", workspaceId);
      toast.success(`Switched to "${workspace.name}" workspace`);
    }
  };

  const inviteTeamMember = async (
    workspaceId: string,
    email: string,
    role: "admin" | "writer" | "viewer"
  ): Promise<boolean> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const workspace = workspaces.find((ws) => ws.id === workspaceId);
      if (!workspace) {
        toast.error("Workspace not found");
        return false;
      }
      
      if (workspace.type !== "team") {
        toast.error("Cannot invite members to individual workspace");
        return false;
      }
      
      if (workspace.members?.some((member) => member.email === email)) {
        toast.error("This email is already invited");
        return false;
      }
      
      const newMember: TeamMember = {
        id: Math.random().toString(36).substring(2, 9),
        name: email.split("@")[0],
        email,
        role,
      };
      
      const updatedWorkspace = {
        ...workspace,
        members: [...(workspace.members || []), newMember],
      };
      
      const updatedWorkspaces = workspaces.map((ws) =>
        ws.id === workspaceId ? updatedWorkspace : ws
      );
      
      setWorkspaces(updatedWorkspaces);
      
      if (currentWorkspace?.id === workspaceId) {
        setCurrentWorkspace(updatedWorkspace);
      }
      
      localStorage.setItem("socialScribe_workspaces", JSON.stringify(updatedWorkspaces));
      
      toast.success(`Invitation sent to ${email}`);
      return true;
    } catch (error) {
      console.error("Failed to invite member:", error);
      toast.error("Failed to send invitation");
      return false;
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        createWorkspace,
        switchWorkspace,
        inviteTeamMember,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => useContext(WorkspaceContext);
