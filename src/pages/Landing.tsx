import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowRight, CheckCircle, Sparkles, Zap, Database, BarChart, 
  MousePointer, Search, FileText, User, Users, Award,
  LineChart, Globe, MessageSquare, Calendar, BriefcaseIcon, Leaf, TreePine,
  Linkedin, ChevronRight, ExternalLink, Monitor, Target
} from "lucide-react";

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

  const handleLinkedInLogin = () => {
    // This would be implemented with actual LinkedIn OAuth
    console.log("LinkedIn login");
    // Placeholder for LinkedIn OAuth flow
    alert("LinkedIn login would be implemented here with proper OAuth");
  };

  const features = [
    {
      title: "AI Content Writer",
      description: "Generate high-quality LinkedIn posts tailored to your voice and style.",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Profile Scraper",
      description: "Extract inspiration from top-performing profiles and content.",
      icon: Search,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Smart Scheduler",
      description: "Plan and schedule your posts for optimal engagement.",
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Analytics Dashboard",
      description: "Track performance and refine your content strategy.",
      icon: LineChart,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  const examplePosts = [
    {
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
      title: "Leadership Insights",
      content: "The most successful leaders I've worked with share one common trait: they prioritize listening over speaking. When team members feel truly heard, innovation thrives naturally.",
      likes: 234,
      comments: 42,
      engagement: "+67%"
    },
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2488&q=80",
      title: "Career Growth",
      content: "After 10 years in tech, here's what I wish I knew day one: Technical skills open doors, but communication skills let you walk through them. Invest equally in both.",
      likes: 458,
      comments: 87,
      engagement: "+89%"
    },
    {
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
      title: "Industry Insights",
      content: "Just released: Our new report shows that companies implementing AI in their marketing strategy see a 43% increase in lead generation and 38% reduction in customer acquisition costs.",
      likes: 326,
      comments: 56,
      engagement: "+73%"
    }
  ];

  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "forever",
      description: "Perfect for individuals just getting started.",
      features: [
        "1 workspace",
        "3 posts per month",
        "Basic templates",
        "Standard support",
      ],
      cta: "Get Started",
      popular: false,
      color: "border-primary",
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
      ],
      cta: "Contact Sales",
      popular: false,
      color: "border-primary hover:border-primary",
      gradient: "from-primary to-primary/70"
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
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className={`border-b bg-background/95 backdrop-blur-md transition-all duration-300 z-20 sticky top-0 ${scrollY > 10 ? 'shadow-sm' : ''}`}>
        <div className="container max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Logo animated />
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors">How It Works</a>
            <a href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">Pricing</a>
            <a href="#testimonials" className="text-foreground/80 hover:text-primary transition-colors">Testimonials</a>
            <a href="/carousels" className="text-foreground/80 hover:text-primary transition-colors">Carousels</a>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <div className="hidden md:flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleOpenAuth("login")}
                className="border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                Log in
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => handleOpenAuth("register")}
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

      {/* Hero section */}
      <section className="py-16 md:py-24 px-4 relative z-10 bg-background">
        <div className="absolute top-20 right-20 text-green/20 animate-float-slow">
          <Leaf className="w-20 h-20" />
        </div>
        <div className="absolute bottom-10 left-10 text-primary/20 animate-float">
          <TreePine className="w-16 h-16" />
        </div>
        
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 md:pr-8 animate-slide-in-left" style={{ animationDuration: '0.7s' }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Elevate Your <span className="text-primary">LinkedIn Presence</span>
            </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                SocialScribe helps professionals create compelling content that drives engagement, builds authority, and grows your network on LinkedIn.
            </p>
              <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={handleGetStarted} 
                  className="text-white bg-primary hover:bg-primary/90 px-8 h-12"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleLinkedInLogin}
                  className="border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] h-12 flex items-center"
                >
                  <Linkedin className="mr-2 h-5 w-5" /> Sign in with LinkedIn
            </Button>
              </div>
              <div className="mt-6 flex items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2 mr-4">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Free plan available</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 animate-slide-in-right" style={{ animationDuration: '0.7s' }}>
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl rounded-full"></div>
                <img 
                  src="/lovable-uploads/dashboard-preview.png" 
                  alt="SocialScribe Dashboard" 
                  className="rounded-xl shadow-2xl border border-border"
                  onError={(e) => {
                    // Fallback to a colored div if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.height = '400px';
                    target.style.background = 'linear-gradient(to right, #0070E0, #12B76A)';
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                    target.alt = 'SocialScribe Preview';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we do section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-primary/10">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              What We Do
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We help professionals and businesses succeed on LinkedIn through AI-powered content creation, optimization, and analytics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Content Creation</h3>
              <p className="text-muted-foreground mb-4">Our AI tools help you create engaging posts, articles, and comments that resonate with your audience and reflect your professional voice.</p>
              <a href="/features" className="text-primary hover:text-primary/80 flex items-center">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-background rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Growth Strategy</h3>
              <p className="text-muted-foreground mb-4">We provide data-driven insights and strategies to help you grow your network, increase engagement, and establish thought leadership.</p>
              <a href="/features" className="text-primary hover:text-primary/80 flex items-center">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-background rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Monitor className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Performance Analytics</h3>
              <p className="text-muted-foreground mb-4">Track the performance of your content, measure engagement metrics, and understand what's working and what needs improvement.</p>
              <a href="/features" className="text-primary hover:text-primary/80 flex items-center">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Example posts section */}
      <section className="py-20 px-4 bg-background">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              Content That Performs
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Examples of high-performing LinkedIn posts created with SocialScribe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {examplePosts.map((post, index) => (
              <div key={index} className="bg-background rounded-lg border border-border overflow-hidden hover:shadow-md transition-all duration-300">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.backgroundColor = '#0070E0';
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                  }}
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-primary">{post.title}</h3>
                    <span className="text-sm bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      {post.engagement}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-5">{post.content}</p>
                  <div className="flex justify-between text-sm text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center gap-1">
                      <span>❤️</span> {post.likes} likes
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💬</span> {post.comments} comments
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={handleGetStarted}
              className="bg-primary hover:bg-primary/90 text-white px-6"
            >
              Create Your Own High-Performing Content <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trusted by section */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container max-w-7xl mx-auto px-4">
          <p className="text-center text-sm uppercase tracking-wider text-muted-foreground mb-6">Trusted by professionals from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <img 
              src="/lovable-uploads/google-logo.svg" 
              alt="Google" 
              className="h-8 opacity-70 hover:opacity-100 transition-opacity"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
            />
            <img 
              src="/lovable-uploads/microsoft-logo.svg" 
              alt="Microsoft" 
              className="h-8 opacity-70 hover:opacity-100 transition-opacity"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
            />
            <img 
              src="/lovable-uploads/amazon-logo.svg" 
              alt="Amazon" 
              className="h-8 opacity-70 hover:opacity-100 transition-opacity"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
            />
            <img 
              src="/lovable-uploads/salesforce-logo.svg" 
              alt="Salesforce" 
              className="h-8 opacity-70 hover:opacity-100 transition-opacity"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
            />
            <img 
              src="/lovable-uploads/adobe-logo.svg" 
              alt="Adobe" 
              className="h-8 opacity-70 hover:opacity-100 transition-opacity"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
            />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-20 px-4 bg-background relative z-10">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              Everything You Need for LinkedIn Success
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive toolkit is designed to help you create, manage, and optimize your LinkedIn content strategy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-background border border-border hover:border-primary/30 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`${feature.bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-primary/10 relative z-10">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              How SocialScribe Works
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process helps you create engaging LinkedIn content in just a few steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="relative">
              <div className="bg-background rounded-lg p-6 border border-border shadow-md relative z-10">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">1</div>
                <h3 className="text-xl font-semibold mb-3 mt-3">Choose Your Content Type</h3>
                <p className="text-muted-foreground mb-4">Select from various LinkedIn content formats optimized for engagement.</p>
                <img 
                  src="/lovable-uploads/step1-screenshot.png" 
                  alt="Step 1" 
                  className="rounded-md border border-border" 
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="hidden md:block absolute top-1/2 -right-5 transform translate-x-full">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-background rounded-lg p-6 border border-border shadow-md relative z-10">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">2</div>
                <h3 className="text-xl font-semibold mb-3 mt-3">Customize Your Message</h3>
                <p className="text-muted-foreground mb-4">Use our AI to generate content tailored to your voice and audience.</p>
                <img 
                  src="/lovable-uploads/step2-screenshot.png" 
                  alt="Step 2" 
                  className="rounded-md border border-border" 
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="hidden md:block absolute top-1/2 -right-5 transform translate-x-full">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-background rounded-lg p-6 border border-border shadow-md relative z-10">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">3</div>
                <h3 className="text-xl font-semibold mb-3 mt-3">Schedule and Track</h3>
                <p className="text-muted-foreground mb-4">Plan your content calendar and measure performance with analytics.</p>
                <img 
                  src="/lovable-uploads/step3-screenshot.png" 
                  alt="Step 3" 
                  className="rounded-md border border-border" 
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing section */}
      <section id="pricing" className="py-20 md:py-24 px-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-primary/10 relative z-10">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              Simple, Transparent Pricing
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for you. All plans include access to our core content creation tools.
            </p>
          </div>
          
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
                  onClick={handleGetStarted}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-background relative z-10">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              What Our Users Say
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professionals already using SocialScribe to elevate their LinkedIn presence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-background rounded-lg p-6 border border-border shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.backgroundColor = '#0070E0';
                      target.style.display = 'flex';
                      target.style.alignItems = 'center';
                      target.style.justifyContent = 'center';
                      target.alt = testimonial.name[0];
                    }}
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-2 -left-2 text-4xl text-primary/20">"</div>
                  <p className="relative z-10 italic text-muted-foreground pl-4">{testimonial.quote}</p>
                  <div className="absolute -bottom-2 -right-2 text-4xl text-primary/20">"</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-16 px-4 bg-background">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 border border-border rounded-lg hover:border-primary/20 transition-colors">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="p-6 border border-border rounded-lg hover:border-primary/20 transition-colors">
              <div className="text-4xl font-bold text-primary mb-2">500K+</div>
              <div className="text-muted-foreground">Posts Generated</div>
            </div>
            <div className="p-6 border border-border rounded-lg hover:border-primary/20 transition-colors">
              <div className="text-4xl font-bold text-primary mb-2">45%</div>
              <div className="text-muted-foreground">Average Engagement Boost</div>
            </div>
            <div className="p-6 border border-border rounded-lg hover:border-primary/20 transition-colors">
              <div className="text-4xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-y border-primary/10 relative z-10">
        <div className="container max-w-5xl mx-auto text-center">
          <div className="absolute top-10 left-[10%] animate-float-slow">
            <Leaf className="h-12 w-12 text-primary opacity-30" />
          </div>
          <div className="absolute bottom-10 right-[10%] animate-float">
            <TreePine className="h-10 w-10 text-green opacity-30" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your LinkedIn Presence?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals creating better LinkedIn content in less time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            onClick={handleGetStarted} 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto text-lg"
          >
            Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => handleOpenAuth("login")}
              className="border-primary/30 hover:bg-primary/5 hover:text-primary px-8 py-6 h-auto text-lg"
            >
              Log In
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required. Start with a free account today.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-primary/10">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 relative inline-block mx-auto w-full">
            <span className="relative">
              Frequently Asked Questions
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Everything you need to know about SocialScribe
          </p>
          
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6 bg-background hover:border-primary/20 transition-colors">
              <h3 className="text-lg font-semibold mb-2 text-primary">How does SocialScribe help with LinkedIn content?</h3>
              <p className="text-muted-foreground">SocialScribe provides AI-powered tools to generate, schedule, and analyze LinkedIn posts. Our platform helps you create engaging content that resonates with your professional audience.</p>
            </div>
            
            <div className="border border-border rounded-lg p-6 bg-background hover:border-primary/20 transition-colors">
              <h3 className="text-lg font-semibold mb-2 text-primary">Do I need technical expertise to use SocialScribe?</h3>
              <p className="text-muted-foreground">Not at all! SocialScribe is designed to be user-friendly. Our intuitive interface makes it easy for anyone to create professional content, regardless of technical expertise.</p>
            </div>
            
            <div className="border border-border rounded-lg p-6 bg-background hover:border-primary/20 transition-colors">
              <h3 className="text-lg font-semibold mb-2 text-primary">Can I cancel my subscription anytime?</h3>
              <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. There are no long-term commitments or cancellation fees.</p>
            </div>
            
            <div className="border border-border rounded-lg p-6 bg-background hover:border-primary/20 transition-colors">
              <h3 className="text-lg font-semibold mb-2 text-primary">Does SocialScribe work with other social platforms?</h3>
              <p className="text-muted-foreground">Currently, SocialScribe is focused on optimizing LinkedIn content. We plan to expand to other professional platforms in the future.</p>
            </div>
            
            <div className="border border-border rounded-lg p-6 bg-background hover:border-primary/20 transition-colors">
              <h3 className="text-lg font-semibold mb-2 text-primary">How secure is my data with SocialScribe?</h3>
              <p className="text-muted-foreground">We take data security very seriously. SocialScribe employs industry-standard encryption and security practices to ensure your information is protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-t border-primary/10 py-12 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
            <Logo />
              <p className="mt-4 text-sm text-muted-foreground">
                Helping professionals create engaging LinkedIn content that drives results.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-primary">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Chrome Extension</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-primary">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Guides</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-primary">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SocialScribe. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a>
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
