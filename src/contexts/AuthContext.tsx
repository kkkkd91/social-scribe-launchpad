import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { AuthResponse } from '../services/auth.service';
import { toast } from "react-hot-toast";

interface AuthContextType {
  user: AuthResponse['user'] | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  loginWithLinkedIn: () => void;
  handleOAuthCallback: (token: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const loadUser = async () => {
      if (authService.isAuthenticated()) {
        try {
          setLoading(true);
          const { user } = await authService.getCurrentUser();
          setUser(user);
          setIsAuthenticated(true);
        } catch (err) {
          // If error getting user, tokens might be invalid
          authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authService.login({ email, password });
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success("Login successful!");
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authService.register({ firstName, lastName, email, password });
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success("Registration successful!");
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    const googleAuthUrl = authService.getGoogleAuthUrl();
    window.location.href = googleAuthUrl;
  };

  const loginWithLinkedIn = () => {
    const linkedInAuthUrl = authService.getLinkedInAuthUrl();
    window.location.href = linkedInAuthUrl;
  };

  const handleOAuthCallback = async (token: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authService.handleOAuthCallback(token);
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success("OAuth login successful!");
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'OAuth login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        loginWithGoogle,
        loginWithLinkedIn,
        handleOAuthCallback,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
