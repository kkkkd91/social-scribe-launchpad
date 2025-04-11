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
  ChevronDown,
  ChevronUp,
  Menu,
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
      className={`bg-white border-r border-gray-100 h-screen transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-[70px]" : "w-64"
      }`}
    >
      <div className="py-5 px-4 border-b border-gray-100 flex items-center justify-between">
        <Logo showText={!isCollapsed} className={isCollapsed ? "justify-center" : ""} />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="text-gray-500 hover:bg-gray-50 rounded-full w-8 h-8 flex items-center justify-center"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-3">
        <Button
          onClick={handleCreateClick}
          className={`w-full bg-sky-400 hover:bg-sky-500 text-white rounded-lg shadow-md py-2.5 transition-all ${
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
        
        <div className="mt-4">
          <div className={isCollapsed ? "" : "px-3 py-2"}>
            {!isCollapsed && <p className="text-xs font-medium text-gray-500 mb-2">MAIN MENU</p>}
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sky-50 text-sky-600 font-medium"
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
            {!isCollapsed && <p className="text-xs font-medium text-gray-500 mb-2">SETTINGS</p>}
          </div>
          
          <nav className="space-y-1">
            {settingsItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sky-50 text-sky-600 font-medium"
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
      
      <div className="mt-auto p-4 border-t border-gray-100">
        {!isCollapsed && (
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <div className="text-xs font-medium text-gray-700">
                Free plan • 15 credits left
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-sky-600 text-xs mt-2 hover:bg-sky-50"
              onClick={() => navigate('/dashboard/billing')}
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
