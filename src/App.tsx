import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Features from './pages/Features';
import Carousels from "./pages/Carousels";

const queryClient = new QueryClient();

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, onboardingComplete } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    if (!onboardingComplete) {
      return <Navigate to="/onboarding" />;
    }

    return children;
  };

  const OnboardingRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, onboardingComplete } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    if (onboardingComplete) {
      return <Navigate to="/dashboard" />;
    }

    return children;
  };

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/carousels" element={<Carousels />} />
            <Route path="/features" element={<Features />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/onboarding"
              element={
                <OnboardingRoute>
                  <Onboarding />
                </OnboardingRoute>
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
