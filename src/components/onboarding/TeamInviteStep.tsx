
import { useState } from "react";
import { ArrowRight, UserPlus, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboarding } from "@/contexts/OnboardingContext";

type InvitedMember = {
  email: string;
  role: "admin" | "writer" | "viewer";
};

const TeamInviteStep = () => {
  const { nextStep, workspaceType } = useOnboarding();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "writer" | "viewer">("writer");
  const [invitedMembers, setInvitedMembers] = useState<InvitedMember[]>([]);

  // Skip this step if workspace type is not team
  if (workspaceType !== "team") {
    return null;
  }

  const handleAddMember = () => {
    if (email.trim()) {
      setInvitedMembers([...invitedMembers, { email: email.trim(), role }]);
      setEmail("");
    }
  };

  const handleRemoveMember = (index: number) => {
    setInvitedMembers(invitedMembers.filter((_, i) => i !== index));
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">Invite your team members</h1>
      <p className="text-muted-foreground mb-8">
        Add team members to collaborate on content
      </p>

      <div className="max-w-md mx-auto">
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-gray-700"
              />
            </div>
            <div>
              <Select value={role} onValueChange={(value: any) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="writer">Writer</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleAddMember}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Team Member
          </Button>
        </div>

        {invitedMembers.length > 0 && (
          <div className="space-y-2 mb-6">
            <h3 className="text-lg font-medium text-left">Invited members:</h3>
            <div className="bg-black/20 rounded-lg p-2 max-h-48 overflow-y-auto">
              {invitedMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-800/50 rounded px-3 py-2 mb-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <div>
                      <p className="text-sm">{member.email}</p>
                      <p className="text-xs text-gray-400 capitalize">{member.role}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveMember(index)}
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
          onClick={() => nextStep()}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700"
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TeamInviteStep;
