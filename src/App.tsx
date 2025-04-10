import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import RequireAuth from "@/components/auth/RequireAuth";
import RequireOnboarding from "@/components/auth/RequireOnboarding";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Onboarding from "@/pages/Onboarding";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Testimonials from "@/pages/Testimonials";
import Celebrate from "@/pages/Celebrate";
import NotFound from "@/pages/NotFound";
import OAuthCallback from "@/components/auth/OAuthCallback";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <OnboardingProvider>
          <WorkspaceProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/auth/callback" element={<OAuthCallback />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected routes */}
                <Route element={<RequireAuth />}>
                  <Route element={<RequireOnboarding />}>
                    <Route path="/dashboard/*" element={<Dashboard />} />
                  </Route>
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/celebrate" element={<Celebrate />} />
                </Route>

                {/* Fallback routes */}
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Router>
            
            <Toaster 
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#fff',
                  color: '#0A1629',
                  border: '1px solid #E6E8EB',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  padding: '12px 16px',
                  borderRadius: '6px',
                }
              }}  
            />
          </WorkspaceProvider>
        </OnboardingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
