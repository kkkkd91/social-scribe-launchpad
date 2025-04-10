
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const Scraper = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Content Scraper</h1>
        <p className="text-muted-foreground">
          Extract inspiration from top-performing LinkedIn profiles and websites
        </p>
      </div>

      <Tabs defaultValue="linkedin">
        <TabsList>
          <TabsTrigger value="linkedin">LinkedIn Profile</TabsTrigger>
          <TabsTrigger value="website">Website/Blog</TabsTrigger>
          <TabsTrigger value="youtube">YouTube</TabsTrigger>
        </TabsList>
        
        <TabsContent value="linkedin" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>LinkedIn Profile Scraper</CardTitle>
              <CardDescription>
                Enter a LinkedIn profile URL to extract content ideas and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Enter LinkedIn profile URL" />
                  <Button>Analyze</Button>
                </div>
                <div className="text-center p-12 border rounded-md bg-muted/30">
                  <p className="text-muted-foreground">
                    Content analysis will appear here after you submit a LinkedIn profile URL
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="website">
          <Card>
            <CardHeader>
              <CardTitle>Website/Blog Scraper</CardTitle>
              <CardDescription>
                Extract content from any website or blog to repurpose for LinkedIn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Enter website or blog URL" />
                  <Button>Analyze</Button>
                </div>
                <div className="text-center p-12 border rounded-md bg-muted/30">
                  <p className="text-muted-foreground">
                    Website content analysis will appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="youtube">
          <Card>
            <CardHeader>
              <CardTitle>YouTube Video Converter</CardTitle>
              <CardDescription>
                Convert YouTube videos into LinkedIn-ready content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Enter YouTube video URL" />
                  <Button>Convert</Button>
                </div>
                <div className="text-center p-12 border rounded-md bg-muted/30">
                  <p className="text-muted-foreground">
                    Video transcript and content suggestions will appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Scraper;
