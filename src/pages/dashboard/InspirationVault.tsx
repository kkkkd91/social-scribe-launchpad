
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Plus } from "lucide-react";

const InspirationVault = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Inspiration Vault</h1>
          <p className="text-muted-foreground">
            Store and organize content ideas for future LinkedIn posts
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> New Idea
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Empty state card */}
        <Card className="border-dashed border-2">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-[250px]">
            <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Save your first idea</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Capture inspiration whenever it strikes for future content creation
            </p>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add Idea
            </Button>
          </CardContent>
        </Card>

        {/* Example inspiration cards */}
        {["Productivity Tips", "Industry Trends", "Career Advice"].map((title, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>Saved idea</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Example inspiration note. This is where you would store your content idea details.
              </p>
            </CardContent>
            <CardFooter className="border-t p-4 flex justify-end">
              <Button variant="ghost" size="sm">
                Create Post
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Trending Content Formats</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {["How-to Guides", "Success Stories", "Failure Lessons"].map((format, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{format}</CardTitle>
                <CardDescription>Trending format</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Content in this format is currently performing well on LinkedIn.
                </p>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-end">
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspirationVault;
