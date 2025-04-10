import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

const Pricing = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<"login" | "register">("register");

  const handleOpenAuth = (view: "login" | "register") => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

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
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
      color: "border-primary hover:border-primary",
      gradient: "from-primary to-primary/70"
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
        "Priority support",
        "LinkedIn profile scraper",
        "Content calendar",
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "border-secondary",
      gradient: "from-secondary to-secondary/70"
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
        "API access",
        "Advanced integrations",
        "Training sessions",
        "Content strategy consultation",
      ],
      cta: "Contact Sales",
      popular: false,
      color: "border-primary hover:border-primary",
      gradient: "from-primary to-primary/70"
    },
  ];

  const handleGetStarted = (plan: string) => {
    if (!isAuthenticated) {
      handleOpenAuth("register");
    }
  };

  const FAQs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. There are no long-term commitments or cancellation fees."
    },
    {
      question: "What happens when my trial ends?",
      answer: "You'll be automatically switched to our Free plan if you don't select a paid plan before your trial ends. You won't lose any data."
    },
    {
      question: "Is there a discount for annual billing?",
      answer: "Yes, we offer a 20% discount when you choose annual billing for any of our paid plans."
    },
    {
      question: "Can I change plans later?",
      answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-md z-10 sticky top-0 shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="mr-8">
              <Logo animated />
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
              Simple, Transparent Pricing
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              Choose the plan that works best for you. All plans include access to our core content creation tools.
            </p>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-background rounded-xl border-2 p-6 relative transition-all duration-300 hover:shadow-lg ${
                  plan.popular ? `border-secondary shadow-lg` : `border-border`
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary text-white text-xs font-bold py-1 px-3 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 mb-4">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground"> / {plan.period}</span>
                </div>
                <p className="text-muted-foreground mb-5 min-h-[50px]">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? "bg-secondary hover:bg-secondary/90 text-white" 
                      : "bg-primary hover:bg-primary/90 text-white"
                  }`}
                  onClick={() => handleGetStarted(plan.name)}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* Enterprise section */}
          <div className="mt-20 bg-background border border-border rounded-xl p-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Enterprise Plan</h2>
                <p className="text-muted-foreground max-w-lg">
                  Need a custom solution for your large team or organization? Contact our sales team to discuss a tailored enterprise plan.
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 min-w-[150px]">
                Contact Sales
              </Button>
            </div>
          </div>

          {/* FAQs */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-10 relative inline-block mx-auto w-full">
              <span className="relative">
                Frequently Asked Questions
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              </span>
            </h2>
            
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {FAQs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg p-6 bg-background">
                  <h3 className="text-lg font-semibold mb-2 text-primary">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 bg-background">
        <div className="container max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SocialScribe. All rights reserved.</p>
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

export default Pricing; 