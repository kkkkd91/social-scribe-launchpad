
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create Post</h1>
        <p className="text-muted-foreground">
          Create LinkedIn content that resonates with your audience
        </p>
      </div>

      <Tabs defaultValue="text">
        <TabsList>
          <TabsTrigger value="text">Text Post</TabsTrigger>
          <TabsTrigger value="carousel">Carousel</TabsTrigger>
          <TabsTrigger value="audio">Audio to Text</TabsTrigger>
          <TabsTrigger value="youtube">YouTube to Text</TabsTrigger>
        </TabsList>
        <TabsContent value="text" className="mt-6">
          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <Textarea
                    placeholder="What would you like to share with your network today?"
                    className="min-h-[300px] border-0 focus-visible:ring-0 resize-none"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Post Now</Button>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">AI Assistance</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      🪄 Generate a hook
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      💡 Suggest a call-to-action
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      🔄 Rephrase this content
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      #️⃣ Generate hashtags
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Post Preview</h3>
                  <div className="rounded-md border p-4 min-h-[200px]">
                    {postContent ? (
                      <div className="whitespace-pre-wrap">{postContent}</div>
                    ) : (
                      <div className="text-muted-foreground">
                        Your post will appear here...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="carousel">
          <div className="py-12 text-center">
            <h3 className="text-2xl font-semibold mb-2">Carousel Post Creator</h3>
            <p className="text-muted-foreground mb-6">
              Create a multi-slide carousel that showcases your expertise
            </p>
            <Button>Create Carousel</Button>
          </div>
        </TabsContent>
        <TabsContent value="audio">
          <div className="py-12 text-center">
            <h3 className="text-2xl font-semibold mb-2">Audio to Text Converter</h3>
            <p className="text-muted-foreground mb-6">
              Convert your audio recordings into engaging LinkedIn posts
            </p>
            <Button>Upload Audio</Button>
          </div>
        </TabsContent>
        <TabsContent value="youtube">
          <div className="py-12 text-center">
            <h3 className="text-2xl font-semibold mb-2">YouTube to Post Converter</h3>
            <p className="text-muted-foreground mb-6">
              Turn your YouTube videos into LinkedIn content
            </p>
            <div className="flex justify-center">
              <div className="flex max-w-md w-full">
                <input 
                  type="text" 
                  placeholder="Paste YouTube URL" 
                  className="rounded-l-md px-4 py-2 w-full border" 
                />
                <Button className="rounded-l-none">Convert</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatePost;
