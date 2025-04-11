import React from 'react';
import { Button } from '@/components/ui/button';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

interface OAuthButtonsProps {
  isLogin?: boolean;
}

const OAuthButtons: React.FC<OAuthButtonsProps> = ({ isLogin = true }) => {
  const { loginWithGoogle, loginWithLinkedIn } = useAuth();

  return (
    <div className="flex flex-col gap-3 w-full">
      <Button 
        variant="outline" 
        type="button" 
        onClick={loginWithGoogle}
        className="flex items-center gap-2"
      >
        <FaGoogle className="w-4 h-4 text-red-500" />
        <span>{isLogin ? 'Sign in' : 'Sign up'} with Google</span>
      </Button>
      
      <Button 
        variant="outline" 
        type="button" 
        onClick={loginWithLinkedIn}
        className="flex items-center gap-2"
      >
        <FaLinkedin className="w-4 h-4 text-blue-600" />
        <span>{isLogin ? 'Sign in' : 'Sign up'} with LinkedIn</span>
      </Button>
    </div>
  );
};

export default OAuthButtons; 