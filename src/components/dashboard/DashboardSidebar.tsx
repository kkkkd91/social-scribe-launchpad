
import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
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
  Layers,
  Trophy,
  Star,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useAuth } from "@/contexts/AuthContext";

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentWorkspace } = useWorkspace();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      icon: LayoutDashboard, 
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
      icon: Layers, 
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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div 
      className={`h-screen transition-all duration-300 flex flex-col bg-sidebar-background border-r border-sidebar-border`}
    >
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <Logo showText={!isCollapsed} className={isCollapsed ? "justify-center" : ""} />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="text-muted-foreground hover:text-primary hover:bg-sidebar-item-active rounded-md"
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="p-3">
        <Button
          onClick={handleCreateClick}
          size="lg"
          className={`w-full rounded-md shadow py-2.5 transition-all ${
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
          <div className={isCollapsed ? "mb-2" : "px-3 mb-2"}>
            {!isCollapsed && <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Navigation</p>}
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = 
                item.path === "/dashboard" 
                  ? location.pathname === "/dashboard" 
                  : location.pathname.startsWith(item.path);
                  
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `${isCollapsed ? "justify-center px-2" : "sidebar-item"} ${
                      isActive ? "active" : ""
                    }`
                  }
                  end={item.path === "/dashboard"}
                >
                  <item.icon size={18} className={isCollapsed ? "" : ""} />
                  {!isCollapsed && <span className="text-sm">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
          
          <div className={`mt-6 ${isCollapsed ? "mb-2" : "px-3 mb-2"}`}>
            {!isCollapsed && <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Account</p>}
          </div>
          
          <nav className="space-y-1">
            {settingsItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `${isCollapsed ? "justify-center px-2" : "sidebar-item"} ${
                      isActive ? "active" : ""
                    }`
                  }
                >
                  <item.icon size={18} className={isCollapsed ? "" : ""} />
                  {!isCollapsed && <span className="text-sm">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border">
        {!isCollapsed ? (
          <div className="rounded-lg bg-sidebar-item-active p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-success"></div>
                <div className="text-xs font-medium text-foreground/80">
                  {currentWorkspace?.type === "team" ? "Team Plan" : "Free Plan"}
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
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="w-full flex justify-center text-muted-foreground hover:text-destructive"
          >
            <LogOut size={18} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
