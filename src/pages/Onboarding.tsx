
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
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900 py-4">
        <div className="container max-w-7xl mx-auto px-4">
          <Logo />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="w-full max-w-2xl mx-auto">
          {renderStep()}
          <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
