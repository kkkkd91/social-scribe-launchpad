
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Image, UploadCloud, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const { toast } = useToast();
  
  // Simulated remaining credits - in a real app, this would come from your backend
  const remainingCredits = 3;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIImage = () => {
    if (remainingCredits <= 0) {
      setShowSubscriptionPrompt(true);
      return;
    }
    
    if (!aiPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your image",
        variant: "destructive"
      });
      return;
    }
    
    setGeneratingImage(true);
    
    // Simulate AI image generation
    setTimeout(() => {
      setGeneratingImage(false);
      // Placeholder image URL - in a real implementation, this would be the response from your AI image service
      setUploadedImage("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500");
      toast({
        title: "Success",
        description: "AI image generated successfully"
      });
    }, 2000);
  };

  const handlePostNow = () => {
    if (remainingCredits <= 0) {
      setShowSubscriptionPrompt(true);
      return;
    }
    
    // Post creation logic would go here
    toast({
      title: "Success",
      description: "Your post has been created successfully"
    });
  };

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
                  
                  {uploadedImage && (
                    <div className="mt-4">
                      <div className="relative rounded-md overflow-hidden">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded image" 
                          className="w-full h-auto max-h-[300px] object-cover"
                        />
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={() => setUploadedImage(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center mt-4 gap-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <UploadCloud size={16} />
                          Upload Image
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Upload Image</SheetTitle>
                          <SheetDescription>
                            Add an image to your post to increase engagement
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="picture">Upload from device</Label>
                            <Input
                              id="picture"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                    
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Wand2 size={16} />
                          Generate AI Image
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>AI Image Generator</SheetTitle>
                          <SheetDescription>
                            Create custom images for your posts using AI
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="prompt">Describe the image you want</Label>
                            <Textarea
                              id="prompt"
                              placeholder="A professional meeting in a modern office setting with diverse team members..."
                              value={aiPrompt}
                              onChange={(e) => setAiPrompt(e.target.value)}
                            />
                          </div>
                          <Button 
                            onClick={generateAIImage} 
                            disabled={generatingImage || !aiPrompt.trim()}
                          >
                            {generatingImage ? "Generating..." : "Generate Image"}
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={handlePostNow}>Post Now</Button>
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
                    {postContent || uploadedImage ? (
                      <div>
                        {uploadedImage && (
                          <div className="mb-4">
                            <img 
                              src={uploadedImage} 
                              alt="Post preview" 
                              className="w-full h-auto rounded-md"
                            />
                          </div>
                        )}
                        <div className="whitespace-pre-wrap">{postContent}</div>
                      </div>
                    ) : (
                      <div className="text-muted-foreground">
                        Your post will appear here...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Credits Remaining</h3>
                    <span className={`text-lg font-bold ${remainingCredits <= 3 ? "text-amber-500" : ""}`}>
                      {remainingCredits}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    You can create {remainingCredits} more posts with your current plan
                  </p>
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
      
      {/* Subscription Prompt Sheet */}
      <Sheet open={showSubscriptionPrompt} onOpenChange={setShowSubscriptionPrompt}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Upgrade Your Plan</SheetTitle>
            <SheetDescription>
              You've used all your monthly credits. Upgrade to continue creating content.
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <Card className="border-primary">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Pro Plan</h3>
                <p className="text-3xl font-bold mb-4">$19<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Unlimited AI generations
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Advanced analytics
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Full template library
                  </li>
                </ul>
                <Button className="w-full">Upgrade Now</Button>
              </CardContent>
            </Card>
            <div className="text-center mt-4">
              <a href="/dashboard/billing" className="text-sm text-primary hover:underline">
                View all plans
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CreatePost;
