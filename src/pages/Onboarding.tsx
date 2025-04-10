import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import ProgressSteps from "@/components/ProgressSteps";
import WorkspaceTypeStep from "@/components/onboarding/WorkspaceTypeStep";
import PostStyleStep from "@/components/onboarding/PostStyleStep";
import PostFrequencyStep from "@/components/onboarding/PostFrequencyStep";
import UserInfoStep from "@/components/onboarding/UserInfoStep";
import FinalStep from "@/components/onboarding/FinalStep";
import WebsiteLinkStep from "@/components/onboarding/WebsiteLinkStep";
import InspirationProfilesStep from "@/components/onboarding/InspirationProfilesStep";
import ChromeExtensionStep from "@/components/onboarding/ChromeExtensionStep";
import LinkedInConnectionStep from "@/components/onboarding/LinkedInConnectionStep";
import TeamInviteStep from "@/components/onboarding/TeamInviteStep";
import WorkspaceNameStep from "@/components/onboarding/WorkspaceNameStep";
import { Sparkles, MessageSquare, PenLine, LineChart, Zap, Users, Database } from "lucide-react";

const Onboarding = () => {
  const { isAuthenticated, onboardingComplete } = useAuth();
  const { currentStep, totalSteps, workspaceType } = useOnboarding();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated, redirect to landing page
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    // If onboarding is already complete, redirect to dashboard
    if (onboardingComplete) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, onboardingComplete, navigate]);

  // Render the current step of the onboarding process
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WorkspaceTypeStep />;
      case 2:
        return <WorkspaceNameStep />;
      case 3:
        return workspaceType === "team" ? <TeamInviteStep /> : <UserInfoStep />;
      case 4:
        return <WebsiteLinkStep />;
      case 5:
        return <InspirationProfilesStep />;
      case 6:
        return <PostStyleStep />;
      case 7:
        return <PostFrequencyStep />;
      case 8:
        return <ChromeExtensionStep />;
      case 9:
        return <FinalStep />;
      default:
        return <WorkspaceTypeStep />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-background to-primary/5">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Blue gradient blob */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        
        {/* Animated icons */}
        <div className="absolute top-[15%] right-[10%]">
          <Sparkles className="w-8 h-8 text-primary/40 animate-pulse-subtle" />
        </div>
        <div className="absolute bottom-[20%] left-[12%]">
          <MessageSquare className="w-7 h-7 text-primary/40 animate-pulse-subtle" />
        </div>
        <div className="absolute top-[35%] left-[8%]">
          <PenLine className="w-6 h-6 text-secondary/40 animate-pulse-subtle" />
        </div>
        <div className="absolute bottom-[30%] right-[8%]">
          <LineChart className="w-7 h-7 text-primary/40 animate-pulse-subtle" />
        </div>
        <div className="absolute top-[60%] right-[15%]">
          <Zap className="w-6 h-6 text-secondary/40 animate-spin-slow" />
        </div>
        <div className="absolute top-[25%] left-[20%]">
          <Users className="w-7 h-7 text-primary/30 animate-float-slow" />
        </div>
        <div className="absolute bottom-[15%] left-[25%]">
          <Database className="w-5 h-5 text-secondary/40 animate-float" />
        </div>
      </div>

      {/* Branding image */}
      <div className="absolute bottom-10 right-10 z-10 hidden lg:block">
        <img 
          src="/lovable-uploads/onboarding-illustration.png" 
          alt="SocialScribe" 
          className="w-56 h-auto opacity-90"
          onError={(e) => {e.currentTarget.style.display = 'none'}}
        />
      </div>

      <header className="border-b border-border backdrop-blur-sm bg-background/90 py-4 z-10 shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Logo />
          <div className="text-sm text-muted-foreground">
            Setting up your content creation workspace
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-6 z-10 w-full">
        <div className="w-full max-w-5xl mx-auto px-4 animate-slide-in-bottom">
          {renderStep()}
          <div className="mt-8">
            <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground z-10 border-t border-border/30 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto">
          SocialScribe • Make your social media content creation effortless
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
