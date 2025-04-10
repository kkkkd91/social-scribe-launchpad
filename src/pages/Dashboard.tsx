
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import CreatePost from "@/pages/dashboard/CreatePost";
import PostLibrary from "@/pages/dashboard/PostLibrary";
import Scraper from "@/pages/dashboard/Scraper";
import InspirationVault from "@/pages/dashboard/InspirationVault";
import AIWriter from "@/pages/dashboard/AIWriter";
import Analytics from "@/pages/dashboard/Analytics";
import Team from "@/pages/dashboard/Team";
import Settings from "@/pages/dashboard/Settings";
import Billing from "@/pages/dashboard/Billing";
import SubscriptionPage from "@/pages/dashboard/SubscriptionPage";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated, onboardingComplete } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated, redirect to landing page
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    // If onboarding is not complete, redirect to onboarding
    if (!onboardingComplete) {
      navigate("/onboarding");
    }
  }, [isAuthenticated, onboardingComplete, navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - hidden on mobile */}
      <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
        <DashboardSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="posts" element={<PostLibrary />} />
            <Route path="scraper" element={<Scraper />} />
            <Route path="inspiration" element={<InspirationVault />} />
            <Route path="writer" element={<AIWriter />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="team" element={<Team />} />
            <Route path="settings" element={<Settings />} />
            <Route path="billing" element={<Billing />} />
            <Route path="subscription" element={<SubscriptionPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
