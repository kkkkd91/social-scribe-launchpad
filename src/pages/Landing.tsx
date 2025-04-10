import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, CheckCircle, Sparkles, Zap, Database, BarChart, MousePointer, Search } from "lucide-react";

const Landing = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<"login" | "register">("login");
  const { isAuthenticated, onboardingComplete } = useAuth();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenAuth = (view: "login" | "register") => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (onboardingComplete) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    } else {
      handleOpenAuth("register");
    }
  };

  const features = [
    {
      title: "AI Content Writer",
      description: "Generate high-quality LinkedIn posts tailored to your voice and style.",
      icon: Sparkles,
      color: "text-brand-teal",
      bgColor: "bg-brand-teal/10",
    },
    {
      title: "Profile Scraper",
      description: "Extract inspiration from top-performing profiles and content.",
      icon: Search,
      color: "text-brand-purple",
      bgColor: "bg-brand-purple/10",
    },
    {
      title: "Smart Scheduler",
      description: "Plan and schedule your posts for optimal engagement.",
      icon: Database,
      color: "text-brand-coral",
      bgColor: "bg-brand-coral/10",
    },
    {
      title: "Analytics Dashboard",
      description: "Track performance and refine your content strategy.",
      icon: BarChart,
      color: "text-brand-teal",
      bgColor: "bg-brand-teal/10",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individual creators just getting started.",
      features: [
        "1 individual workspace",
        "3 AI generations per day",
        "Basic analytics",
        "Limited content templates",
      ],
      cta: "Get Started",
      popular: false,
      color: "border-brand-teal hover:border-brand-teal",
      gradient: "from-brand-teal to-brand-teal-light"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For serious content creators looking to grow their presence.",
      features: [
        "3 workspaces (team or individual)",
        "Unlimited AI generations",
        "Advanced analytics",
        "Full template library",
        "Up to 5 team members",
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "border-brand-purple",
      gradient: "from-brand-purple to-brand-purple-light"
    },
    {
      name: "Business",
      price: "$49",
      period: "per month",
      description: "For teams managing multiple brands and clients.",
      features: [
        "10+ workspaces",
        "Unlimited AI generations",
        "Premium analytics",
        "Custom templates",
        "Unlimited team members",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      popular: false,
      color: "border-brand-coral hover:border-brand-coral",
      gradient: "from-brand-coral to-brand-coral-light"
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechGrowth",
      quote: "SocialScribe transformed how our team creates LinkedIn content. The AI writer saves us hours and the engagement has increased by 45%.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Michael Chang",
      role: "Founder",
      company: "StartupLaunch",
      quote: "As a founder, I need to maintain a strong personal brand. SocialScribe's tools help me stay consistent even when I'm busy with 100 other things.",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    },
    {
      name: "Elena Rodriguez",
      role: "Content Strategist",
      company: "CreativeMinds",
      quote: "The analytics help me understand what resonates with my audience. My content strategy has never been more data-driven.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-24 right-[10%] opacity-25 w-64 h-64 rounded-full bg-brand-teal/20 blur-3xl animate-float-slow" />
        <div className="absolute top-96 left-[5%] opacity-20 w-96 h-96 rounded-full bg-brand-purple/20 blur-3xl animate-float" />
        <div className="absolute bottom-[30%] right-[5%] opacity-20 w-80 h-80 rounded-full bg-brand-coral/20 blur-3xl animate-float-fast" />
      </div>

      <header className={`border-b bg-background/90 backdrop-blur-md transition-all duration-300 z-20 sticky top-0 ${scrollY > 10 ? 'shadow-sm' : ''}`}>
        <div className="container max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Logo animated />
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" onClick={() => handleOpenAuth("login")}>
                Log in
              </Button>
              <Button 
                variant="gradient" 
                onClick={() => handleOpenAuth("register")}
                className="animate-pulse-subtle"
              >
                Register
              </Button>
            </div>
            
            <Button className="md:hidden" size="sm" onClick={() => handleOpenAuth("login")}>
              Log in
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 md:py-32 px-4 relative z-10 overflow-hidden">
        <div className="container max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in-bottom" style={{ animationDelay: '0.1s' }}>
              Create LinkedIn content with <span className="gradient-text">high reach</span> in minutes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-in-bottom" style={{ animationDelay: '0.3s' }}>
              SocialScribe knows what works by analyzing thousands of viral LinkedIn posts daily. 
              No generic AI fluff - train the AI with your knowledge to generate personalized content.
            </p>
            <Button 
              size="lg" 
              onClick={handleGetStarted} 
              className="text-lg px-8 py-6 h-auto gradient-bg animate-slide-in-bottom shadow-lg hover:shadow-xl" 
              style={{ animationDelay: '0.5s' }}
            >
              Start Creating Content <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4 animate-slide-in-bottom" style={{ animationDelay: '0.7s' }}>
              No credit card required
            </p>
          </div>

          <div className="hidden md:block absolute bottom-0 right-[20%] animate-float">
            <MousePointer className="h-8 w-8 text-brand-teal opacity-70" />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-background to-primary/5 relative z-10">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
            Not a Generic AI Content Tool
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className={`${feature.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 relative z-10" id="pricing">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include access to our core AI content tools.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`glass-card border-2 rounded-xl p-8 relative transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? `border-brand-purple` : `${plan.color}`
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand-purple to-brand-teal text-white text-xs font-bold py-1 px-3 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground"> / {plan.period}</span>
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className={`h-5 w-5 mr-2 shrink-0 mt-0.5 ${
                        plan.popular ? "text-brand-purple" : plan.name === "Free" ? "text-brand-teal" : "text-brand-coral"
                      }`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? "bg-gradient-to-r from-brand-purple to-brand-teal hover:opacity-90" 
                      : plan.name === "Free"
                        ? "bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:opacity-90"
                        : "bg-gradient-to-r from-brand-coral to-brand-coral-dark hover:opacity-90"
                  }`}
                  onClick={handleGetStarted}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-gradient-to-r from-primary/10 to-accent/10 relative z-10">
        <div className="container max-w-5xl mx-auto text-center">
          <div className="absolute top-10 left-[10%] animate-float-slow">
            <Sparkles className="h-8 w-8 text-brand-teal opacity-30" />
          </div>
          <div className="absolute bottom-10 right-[10%] animate-float">
            <Zap className="h-8 w-8 text-brand-purple opacity-30" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            Ready to transform your LinkedIn presence?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already creating better LinkedIn content in less time.
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted} 
            variant="gradient" 
            className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl"
          >
            Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <footer className="border-t py-8 px-4 bg-background">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo />
            <div className="text-sm text-muted-foreground mt-4 md:mt-0">
              © {new Date().getFullYear()} SocialScribe. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
      />
    </div>
  );
};

export default Landing;
