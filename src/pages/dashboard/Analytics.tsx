
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, Activity, ThumbsUp, MessageSquare, Share2, Eye } from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Track your LinkedIn content performance and audience engagement
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { title: "Total Views", value: "0", icon: Eye, change: "+0%" },
          { title: "Likes", value: "0", icon: ThumbsUp, change: "+0%" },
          { title: "Comments", value: "0", icon: MessageSquare, change: "+0%" },
          { title: "Shares", value: "0", icon: Share2, change: "+0%" },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-md">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-2 text-xs font-medium">
                <span className="text-green-500">{stat.change}</span> vs last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="engagement">
        <TabsList>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="posts">Posts Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="engagement" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Over Time</CardTitle>
              <CardDescription>
                Track how your content engagement changes over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                <p className="text-muted-foreground">
                  Engagement data visualization will appear here once you have published posts
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="audience" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Audience Growth</CardTitle>
              <CardDescription>
                Track how your audience is growing over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                <p className="text-muted-foreground">
                  Audience growth data will appear here as you gain followers
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="posts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Performance</CardTitle>
              <CardDescription>
                Compare engagement across your different posts
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                <p className="text-muted-foreground">
                  Post performance comparison will appear here once you have multiple posts
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Best Performing Content</CardTitle>
            <CardDescription>
              Your top-performing content by engagement
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">
              Your best performing content will be displayed here
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Posting Times</CardTitle>
            <CardDescription>
              Best times to post based on your audience engagement
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">
              Recommended posting times will appear here based on your audience activity
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
