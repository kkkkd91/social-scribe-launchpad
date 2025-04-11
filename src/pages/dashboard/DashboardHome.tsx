
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  LineChart, 
  Users, 
  Award, 
  Clock, 
  TrendingUp,
  Lightbulb,
  Calendar,
  ThumbsUp,
  Sparkles,
  FileText,
  Settings2,
  BookOpen,
  PieChart,
  BrainCircuit
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const DashboardHome = () => {
  const { user } = useAuth();
  const { currentWorkspace } = useWorkspace();

  const quickActions = [
    {
      title: "Create new post",
      description: "Write a LinkedIn post with AI assistance",
      icon: <PenIcon className="h-10 w-10 text-primary" />,
      link: "/dashboard/create",
      color: "bg-primary/10",
    },
    {
      title: "Scrape for inspiration",
      description: "Extract content ideas from profiles or websites",
      icon: <SearchIcon className="h-10 w-10 text-secondary" />,
      link: "/dashboard/scraper",
      color: "bg-secondary/10",
    },
    {
      title: "View analytics",
      description: "Check your content performance",
      icon: <LineChart className="h-10 w-10 text-accent" />,
      link: "/dashboard/analytics",
      color: "bg-accent/10",
    },
  ];

  const stats = [
    {
      title: "Posts Created",
      value: "0",
      icon: <FileText className="h-5 w-5 text-primary" />,
      change: "+0%",
      trend: "neutral",
    },
    {
      title: "Total Engagement",
      value: "0",
      icon: <ThumbsUp className="h-5 w-5 text-secondary" />,
      change: "+0%",
      trend: "neutral",
    },
    {
      title: "Audience Growth",
      value: "0%",
      icon: <TrendingUp className="h-5 w-5 text-accent" />,
      change: "+0%",
      trend: "neutral",
    },
    {
      title: "Content Quality",
      value: "N/A",
      icon: <Award className="h-5 w-5 text-warning" />,
      change: "+0%",
      trend: "neutral",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {user?.firstName || "User"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {currentWorkspace?.type === "team" 
              ? `Team workspace: ${currentWorkspace?.name}` 
              : `Personal workspace: ${currentWorkspace?.name}`}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Calendar className="mr-2 h-4 w-4" /> Content Calendar
          </Button>
          <Button size="sm">
            <PenIcon className="mr-2 h-4 w-4" /> Create New Post
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className={`rounded-full p-2 ${
                    i === 0 ? 'bg-primary/10' : 
                    i === 1 ? 'bg-secondary/10' : 
                    i === 2 ? 'bg-accent/10' : 
                    'bg-warning/10'
                  }`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <span className={`ml-2 text-xs ${
                    stat.trend === 'up' ? 'text-success' : 
                    stat.trend === 'down' ? 'text-destructive' : 
                    'text-muted-foreground'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`h-1 w-full ${
                i === 0 ? 'bg-primary' : 
                i === 1 ? 'bg-secondary' : 
                i === 2 ? 'bg-accent' : 
                'bg-warning'
              }`}></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xl">Content Performance</CardTitle>
              <CardDescription>Track your post engagement over time</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </CardHeader>
          <CardContent className="py-6">
            <div className="relative h-80 flex items-center justify-center bg-muted/20 rounded-md">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto text-muted" />
                <p className="mt-2 text-muted-foreground">No data available yet</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Create your first post
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Lightbulb className="h-5 w-5 text-primary" /> Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="bg-primary/10 rounded-full p-1.5 h-fit mt-0.5">
                  <Settings2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Complete your profile</p>
                  <p className="text-sm text-muted-foreground">
                    Add your LinkedIn profile to get personalized recommendations
                  </p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="bg-secondary/10 rounded-full p-1.5 h-fit mt-0.5">
                  <Calendar className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Create a content calendar</p>
                  <p className="text-sm text-muted-foreground">
                    Plan your posts in advance for consistent engagement
                  </p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="bg-accent/10 rounded-full p-1.5 h-fit mt-0.5">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Invite team members</p>
                  <p className="text-sm text-muted-foreground">
                    Collaborate with your team to create better content
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mt-6">Quick Actions</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {quickActions.map((action, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow group">
            <CardHeader className="flex flex-row items-start gap-4 pb-0">
              <div className={`${action.color} p-3 rounded-md`}>
                {action.icon}
              </div>
              <div className="space-y-1">
                <CardTitle>{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <Button 
                variant="ghost" 
                className="mt-2 group-hover:bg-primary/10 group-hover:text-primary" 
                asChild
              >
                <a href={action.link}>
                  Get Started <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="h-5 w-5 text-primary" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <BookOpen className="h-12 w-12 text-muted" />
              <p className="text-muted-foreground mt-2">No recent activity yet</p>
              <Button variant="outline" className="mt-4">
                Create your first post
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-primary" /> AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <BrainCircuit className="h-12 w-12 text-muted" />
              <p className="text-muted-foreground mt-2">Get AI-powered content suggestions</p>
              <Button className="mt-4">
                Generate Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Icon components
const PenIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default DashboardHome;
