import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const RequireOnboarding = () => {
  const { onboardingComplete, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking onboarding status
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to onboarding if not completed
  if (!onboardingComplete) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  // If onboarding completed, render the child routes
  return <Outlet />;
};

export default RequireOnboarding; 