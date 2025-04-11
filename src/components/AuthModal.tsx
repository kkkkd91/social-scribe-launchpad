import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "./Logo";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import { toast } from "@/lib/toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: "login" | "register";
  onLinkedInLogin?: () => void;
}

const AuthModal = ({ isOpen, onClose, initialView = "login", onLinkedInLogin }: AuthModalProps) => {
  const [view, setView] = useState<"login" | "register">(initialView);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register, isAuthenticated, onboardingComplete } = useAuth();
  const navigate = useNavigate();
  
  // Update view when initialView prop changes
  useEffect(() => {
    setView(initialView);
  }, [initialView]);
  
  // Handle authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      if (!onboardingComplete) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
      onClose();
    }
  }, [isAuthenticated, onboardingComplete, navigate, onClose]);
  
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
  };
  
  const handleRegister = async (firstName: string, lastName: string, email: string, password: string) => {
    setIsLoading(true);
    await register(firstName, lastName, email, password);
    setIsLoading(false);
  };
  
  const handleLinkedInAuth = () => {
    if (onLinkedInLogin) {
      onLinkedInLogin();
    } else {
      toast.info("LinkedIn authentication will be implemented soon");
    }
  };
  
  const toggleView = () => {
    setView(view === "login" ? "register" : "login");
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto animate-slide-in-right">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <Logo />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {view === "login" ? "Welcome back" : "Create your account"}
          </h2>
          
          {view === "login" ? (
            <LoginForm 
              onLogin={handleLogin} 
              onSwitchView={toggleView} 
              isLoading={isLoading}
              onLinkedInLogin={handleLinkedInAuth}
            />
          ) : (
            <RegisterForm 
              onRegister={handleRegister} 
              onSwitchView={toggleView} 
              isLoading={isLoading}
              onLinkedInLogin={handleLinkedInAuth}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
