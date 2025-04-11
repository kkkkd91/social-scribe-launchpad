
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  ChevronDown, 
  Menu,
  CircleUser,
  Search,
  PlusSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader = ({ toggleSidebar }: DashboardHeaderProps) => {
  const { user, logout } = useAuth();
  const { currentWorkspace, workspaces, switchWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b py-3 px-4 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden rounded-md">
            <Menu className="h-5 w-5" />
          </Button>
          
          {currentWorkspace && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-md">
                  <span className="font-medium">{currentWorkspace.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white shadow-lg border rounded-md w-56">
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {workspaces.map((workspace) => (
                  <DropdownMenuItem 
                    key={workspace.id} 
                    onClick={() => switchWorkspace(workspace.id)}
                    className="rounded-sm hover:bg-primary/10"
                  >
                    {workspace.name}
                    {workspace.id === currentWorkspace.id && (
                      <span className="ml-auto text-primary">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => navigate("/onboarding")}
                  className="rounded-sm hover:bg-primary/10"
                >
                  Create new workspace
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex items-center gap-1 rounded-md border-primary text-primary hover:bg-primary/10"
            onClick={() => navigate('/dashboard/create')}
          >
            <PlusSquare className="h-4 w-4" />
            <span>Create</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-md">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <CircleUser className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-lg border rounded-md w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => navigate("/dashboard/settings")}
                className="rounded-sm hover:bg-primary/10"
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/dashboard/billing")}
                className="rounded-sm hover:bg-primary/10"
              >
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="rounded-sm hover:bg-primary/10"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
