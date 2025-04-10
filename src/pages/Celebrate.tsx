
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import confetti from "canvas-confetti";

const Celebrate = () => {
  const [countdown, setCountdown] = useState(3);
  const { isAuthenticated, onboardingComplete } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated or onboarding is not complete, redirect
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    if (!onboardingComplete) {
      navigate("/onboarding");
      return;
    }

    // Trigger confetti on mount
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
      }));
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
      }));
    }, 250);

    // Countdown to auto-redirect
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
          navigate("/dashboard");
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
    };
  }, [isAuthenticated, onboardingComplete, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background py-4">
        <div className="container max-w-7xl mx-auto px-4">
          <Logo />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in">
            🎉 You're all set up!
          </h1>
          
          <Button 
            size="lg" 
            onClick={() => navigate("/dashboard")}
            className="text-lg px-8 animate-fade-in"
          >
            Go to Dashboard ({countdown})
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Celebrate;
