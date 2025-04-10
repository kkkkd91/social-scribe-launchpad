
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import ProgressSteps from "@/components/ProgressSteps";
import WorkspaceTypeStep from "@/components/onboarding/WorkspaceTypeStep";
import ThemeSelectionStep from "@/components/onboarding/ThemeSelectionStep";
import LanguageSelectionStep from "@/components/onboarding/LanguageSelectionStep";
import PostStyleStep from "@/components/onboarding/PostStyleStep";
import PostFrequencyStep from "@/components/onboarding/PostFrequencyStep";
import UserInfoStep from "@/components/onboarding/UserInfoStep";
import FinalStep from "@/components/onboarding/FinalStep";

const Onboarding = () => {
  const { isAuthenticated, onboardingComplete } = useAuth();
  const { currentStep, totalSteps } = useOnboarding();
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
        return <ThemeSelectionStep />;
      case 3:
        return <LanguageSelectionStep />;
      case 4:
        return <PostStyleStep />;
      case 5:
        return <PostFrequencyStep />;
      case 6:
        return <UserInfoStep />;
      case 7:
        return <FinalStep />;
      default:
        return <WorkspaceTypeStep />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background py-4">
        <div className="container max-w-7xl mx-auto px-4">
          <Logo />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto">
          {renderStep()}
          <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
