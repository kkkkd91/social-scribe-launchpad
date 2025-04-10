
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  PenSquare,
  FileText,
  Search,
  Lightbulb,
  BrainCircuit,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentWorkspace } = useWorkspace();

  const navItems = [
    { 
      icon: Home, 
      label: "Home", 
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
      icon: Lightbulb, 
      label: "Inspiration Vault", 
      path: "/dashboard/inspiration" 
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
  navItems.push(
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
  );

  return (
    <div className={`bg-sidebar border-r border-sidebar-border h-screen transition-all duration-300 flex flex-col ${isCollapsed ? "w-16" : "w-60"}`}>
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <Logo showText={!isCollapsed} className={isCollapsed ? "justify-center" : ""} />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      
      <div className="p-2">
        <Button
          variant="default"
          className="w-full mb-4 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
        >
          {isCollapsed ? (
            <PenSquare size={18} />
          ) : (
            <span className="flex items-center">
              <PenSquare size={18} className="mr-2" /> Create posts
            </span>
          )}
        </Button>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                } ${isCollapsed ? "justify-center" : ""}`
              }
              end={item.path === "/dashboard"}
            >
              <item.icon size={18} className={isCollapsed ? "" : "mr-3"} />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/70">
            Free plan · 15 credits left
          </div>
        )}
      </div>
    </div>
  );
};

const ChevronLeft = () => <ChevronUp className="rotate-90 h-4 w-4" />;
const ChevronRight = () => <ChevronDown className="rotate-90 h-4 w-4" />;

export default DashboardSidebar;
