import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const OAuthCallback: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleOAuthCallback } = useAuth();

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        setIsProcessing(true);
        
        // Get token from URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        
        if (!token) {
          setError('Invalid callback URL. No token found.');
          return;
        }
        
        // Process the token
        const data = await handleOAuthCallback(token);
        
        // Redirect based on onboarding status
        if (data.user.onboardingStatus === 'incomplete') {
          navigate('/onboarding');
        } else {
          navigate('/dashboard');
        }
      } catch (err: any) {
        console.error('OAuth callback error:', err);
        setError(err.message || 'Failed to process authentication');
      } finally {
        setIsProcessing(false);
      }
    };

    if (!user) {
      processOAuthCallback();
    } else {
      // User is already logged in
      navigate('/dashboard');
    }
  }, [location, navigate, user, handleOAuthCallback]);

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-semibold">Processing your login...</h2>
        <p className="text-muted-foreground mt-2">Please wait while we authenticate you</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl text-red-500">✗</span>
        </div>
        <h2 className="text-xl font-semibold text-red-600">Authentication Failed</h2>
        <p className="text-muted-foreground mt-2 max-w-md text-center">{error}</p>
        <button 
          onClick={() => navigate('/login')} 
          className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return null;
};

export default OAuthCallback; 