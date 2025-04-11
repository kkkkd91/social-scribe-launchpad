
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  PenSquare,
  FileText,
  Search,
  BrainCircuit,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  ChevronRight,
  Menu,
  ArrowLeft,
  Grid3X3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const navItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      path: "/dashboard" 
    },
    { 
      icon: PenSquare, 
      label: "Create Post", 
      path: "/dashboard/create" 
    },
    { 
      icon: FileText, 
      label: "Post Library", 
      path: "/dashboard/posts" 
    },
    { 
      icon: Search, 
      label: "Scraper", 
      path: "/dashboard/scraper" 
    },
    { 
      icon: BrainCircuit, 
      label: "AI Writer", 
      path: "/dashboard/writer" 
    },
    { 
      icon: Grid3X3, 
      label: "Carousels", 
      path: "/dashboard/request-carousel" 
    },
    { 
      icon: BarChart3, 
      label: "Analytics", 
      path: "/dashboard/analytics" 
    },
  ];

  // Conditional items based on workspace type
  if (currentWorkspace?.type === "team") {
    navItems.push({ 
      icon: Users, 
      label: "Team", 
      path: "/dashboard/team" 
    });
  }

  // Settings and billing are always available
  const settingsItems = [
    { 
      icon: Settings, 
      label: "Settings", 
      path: "/dashboard/settings" 
    },
    { 
      icon: CreditCard, 
      label: "Billing", 
      path: "/dashboard/billing" 
    }
  ];

  const handleCreateClick = () => {
    navigate('/dashboard/create');
  };

  return (
    <div 
      className={`bg-white shadow-md h-screen transition-all duration-300 flex flex-col border-r ${
        isCollapsed ? "w-[70px]" : "w-64"
      }`}
    >
      <div className="py-5 px-4 border-b flex items-center justify-between">
        <Logo showText={!isCollapsed} className={isCollapsed ? "justify-center" : ""} />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="text-primary hover:bg-primary/10 rounded-md"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="p-3">
        <Button
          onClick={handleCreateClick}
          className={`w-full bg-primary hover:bg-primary/90 rounded-md shadow py-2.5 transition-all ${
            isCollapsed ? "px-0" : "px-4"
          }`}
        >
          {isCollapsed ? (
            <PenSquare size={18} />
          ) : (
            <span className="flex items-center">
              <PenSquare size={18} className="mr-2" /> Create post
            </span>
          )}
        </Button>
        
        <div className="mt-6">
          <div className={isCollapsed ? "" : "px-3 py-2"}>
            {!isCollapsed && <p className="text-xs font-medium text-muted-foreground mb-2">NAVIGATION</p>}
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  } ${isCollapsed ? "justify-center" : ""}`
                }
                end={item.path === "/dashboard"}
              >
                <item.icon size={18} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
              </NavLink>
            ))}
          </nav>
          
          <div className={`mt-6 ${isCollapsed ? "" : "px-3 py-2"}`}>
            {!isCollapsed && <p className="text-xs font-medium text-muted-foreground mb-2">ACCOUNT</p>}
          </div>
          
          <nav className="space-y-1">
            {settingsItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  } ${isCollapsed ? "justify-center" : ""}`
                }
              >
                <item.icon size={18} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t">
        {!isCollapsed && (
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="text-xs font-medium text-gray-700">
                  Free plan
                </div>
              </div>
              <span className="text-xs font-semibold text-primary">15 credits</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-primary text-xs mt-2 hover:bg-primary/10 rounded-md"
              onClick={() => navigate('/dashboard/subscription')}
            >
              Upgrade Plan
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
