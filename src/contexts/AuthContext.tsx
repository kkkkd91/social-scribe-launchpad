import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/lib/toast";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboardingComplete: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  onboardingComplete: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  completeOnboarding: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("socialScribe_user");
    const savedOnboarding = localStorage.getItem("socialScribe_onboardingComplete");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedOnboarding === "true") {
      setOnboardingComplete(true);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (email && password) {
        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
          firstName: "Demo",
          lastName: "User",
          email,
        };
        
        setUser(newUser);
        localStorage.setItem("socialScribe_user", JSON.stringify(newUser));
        
        toast.success("Login successful");
        return true;
      }
      
      toast.error("Invalid credentials");
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (firstName && lastName && email && password) {
        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
          firstName,
          lastName,
          email,
        };
        
        setUser(newUser);
        localStorage.setItem("socialScribe_user", JSON.stringify(newUser));
        
        toast.success("Registration successful");
        return true;
      }
      
      toast.error("Please fill all required fields");
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("socialScribe_user");
    toast.success("Logged out successfully");
  };

  const completeOnboarding = () => {
    setOnboardingComplete(true);
    localStorage.setItem("socialScribe_onboardingComplete", "true");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        onboardingComplete,
        login,
        register,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
