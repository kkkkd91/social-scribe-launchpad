import { useState } from "react";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Linkedin } from "lucide-react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSwitchView: () => void;
  isLoading: boolean;
  onLinkedInLogin?: () => void;
}

const LoginForm = ({ onLogin, onSwitchView, isLoading, onLinkedInLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    await onLogin(email, password);
  };

  const handleLinkedInLogin = () => {
    if (onLinkedInLogin) {
      onLinkedInLogin();
    } else {
      // Fallback if no handler is provided
      toast.info("LinkedIn login will be available soon");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-800">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="rounded-lg border-gray-200 bg-white px-4 py-2.5 text-gray-900 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="password" className="text-sm font-medium text-gray-800">Password</Label>
          <a href="#" className="text-xs text-sky-600 hover:text-sky-700 hover:underline">Forgot Password?</a>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="rounded-lg border-gray-200 bg-white px-4 py-2.5 text-gray-900 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full py-2.5 rounded-lg font-medium bg-sky-400 hover:bg-sky-500 text-white shadow-md transition-all"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
      
      <div className="flex items-center gap-4 my-5">
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="text-xs font-medium text-gray-500">OR CONTINUE WITH</span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button 
          type="button" 
          variant="outline" 
          className="border-gray-200 bg-white text-gray-800 hover:bg-gray-50 rounded-lg py-2.5 shadow-sm flex items-center justify-center gap-2"
          onClick={handleLinkedInLogin}
        >
          <Linkedin className="h-4 w-4 text-[#0A66C2]" />
          <span className="text-sm font-medium">LinkedIn</span>
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          className="border-gray-200 bg-white text-gray-800 hover:bg-gray-50 rounded-lg py-2.5 shadow-sm flex items-center justify-center gap-2"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <g transform="matrix(1, 0, 0, 1, 27.009, -39.238)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
            </g>
          </svg>
          <span className="text-sm font-medium">Google</span>
        </Button>
      </div>
      
      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchView}
          className="text-sky-600 font-medium hover:text-sky-700 hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
