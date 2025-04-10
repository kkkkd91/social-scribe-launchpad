import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Target, Monitor, Calendar, Globe, Users, LineChart, Search, Award, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

const Features = () => {
  const features = [
    {
      title: "AI Content Writer",
      description: "Generate high-quality LinkedIn posts tailored to your voice and style. Our advanced AI analyzes top-performing content to create posts that resonate with your audience.",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Profile Scraper",
      description: "Extract inspiration from top-performing profiles and content. Learn from the best in your industry and adapt their successful strategies to your own content.",
      icon: Search,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Smart Scheduler",
      description: "Plan and schedule your posts for optimal engagement. Our algorithm determines the best times to post based on your audience's activity patterns.",
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Analytics Dashboard",
      description: "Track performance and refine your content strategy. Get detailed insights on engagement, reach, and follower growth to optimize your LinkedIn presence.",
      icon: LineChart,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Audience Targeting",
      description: "Tailor your content to specific industry segments. Create custom audience personas and generate content that speaks directly to their needs and interests.",
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Team Collaboration",
      description: "Work together with your marketing team. Share drafts, provide feedback, and maintain a consistent brand voice across all team members.",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Multi-Language Support",
      description: "Create content in multiple languages to reach a global audience. Our AI maintains your tone and messaging across different languages and cultural contexts.",
      icon: Globe,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Performance Monitoring",
      description: "Get real-time alerts on post performance. Set custom goals and receive notifications when your content exceeds or falls short of expectations.",
      icon: Monitor,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Competitor Analysis",
      description: "Track and analyze your competitors' LinkedIn strategies. Identify gaps in their content approach that you can leverage for your own advantage.",
      icon: Award,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Comment Assistance",
      description: "Generate thoughtful responses to comments on your posts. Maintain engagement with your audience through AI-powered comment suggestions.",
      icon: MessageSquare,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
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
              All Features
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              Explore all the powerful tools and features that SocialScribe offers to enhance your LinkedIn presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

          {/* CTA section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to try all these features?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6">
                  Get Started
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="border-primary/30 hover:bg-primary/5 hover:text-primary">
                  View Pricing
                </Button>
              </Link>
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
    </div>
  );
};

export default Features; 