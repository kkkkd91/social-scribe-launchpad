
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import ProgressSteps from "@/components/ProgressSteps";
import WorkspaceTypeStep from "@/components/onboarding/WorkspaceTypeStep";
import ThemeSelectionStep from "@/components/onboarding/ThemeSelectionStep";
import PostStyleStep from "@/components/onboarding/PostStyleStep";
import PostFrequencyStep from "@/components/onboarding/PostFrequencyStep";
import UserInfoStep from "@/components/onboarding/UserInfoStep";
import FinalStep from "@/components/onboarding/FinalStep";
import WebsiteLinkStep from "@/components/onboarding/WebsiteLinkStep";
import InspirationProfilesStep from "@/components/onboarding/InspirationProfilesStep";
import ChromeExtensionStep from "@/components/onboarding/ChromeExtensionStep";
import LinkedInConnectionStep from "@/components/onboarding/LinkedInConnectionStep";
import TeamInviteStep from "@/components/onboarding/TeamInviteStep";
import { Sparkles, MessageSquare, Zap, Lightbulb, ArrowUpRight } from "lucide-react";

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
        return workspaceType === "team" ? <TeamInviteStep /> : <UserInfoStep />;
      case 3:
        return <WebsiteLinkStep />;
      case 4:
        return <InspirationProfilesStep />;
      case 5:
        return <PostStyleStep />;
      case 6:
        return <PostFrequencyStep />;
      case 7:
        return <ChromeExtensionStep />;
      case 8:
        return <LinkedInConnectionStep />;
      case 9:
        return <ThemeSelectionStep />;
      case 10:
        return <FinalStep />;
      default:
        return <WorkspaceTypeStep />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-background to-primary/5">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-12 h-12 rounded-full bg-brand-teal/20 animate-float-slow" />
        <div className="absolute top-40 right-[15%] w-8 h-8 rounded-full bg-brand-purple/20 animate-float" />
        <div className="absolute bottom-[30%] left-[20%] w-16 h-16 rounded-full bg-brand-coral/20 animate-float-fast" />
        <div className="absolute bottom-[15%] right-[25%] w-10 h-10 rounded-full bg-brand-teal/15 animate-float-slow" />
        
        <div className="absolute top-[25%] right-[8%]">
          <Sparkles className="w-8 h-8 text-brand-purple/40 animate-pulse-subtle" />
        </div>
        <div className="absolute bottom-[40%] left-[12%]">
          <MessageSquare className="w-6 h-6 text-brand-teal/40 animate-pulse-subtle" />
        </div>
        <div className="absolute top-[35%] left-[5%]">
          <Zap className="w-7 h-7 text-brand-coral/40 animate-pulse-subtle" />
        </div>
        <div className="absolute bottom-[10%] right-[15%]">
          <Lightbulb className="w-8 h-8 text-brand-purple/40 animate-pulse-subtle" />
        </div>
        <div className="absolute top-[15%] left-[30%]">
          <ArrowUpRight className="w-5 h-5 text-brand-teal/40 animate-spin-slow" />
        </div>
      </div>

      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 py-4 z-10">
        <div className="container max-w-7xl mx-auto px-4">
          <Logo />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        <div className="w-full max-w-2xl mx-auto animate-slide-in-bottom">
          <div className="glass-card p-8 shadow-lg">
            {renderStep()}
            <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
