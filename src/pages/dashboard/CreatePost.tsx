import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Image, UploadCloud, Wand2, ArrowLeft, ArrowRight, X, Eye, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SliderTypes, { SliderType, SliderTypeOptions } from "@/components/carousel/SliderTypes";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [previewCarousel, setPreviewCarousel] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderType, setSliderType] = useState<SliderType>("basic");
  const [showSliderOptions, setShowSliderOptions] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const sampleCarousels = [
    {
      id: 1,
      title: "5 LinkedIn Growth Strategies",
      subtitle: "Proven tactics to boost your profile visibility",
      category: "Business Growth",
      tone: "Professional tone",
      color: "bg-gradient-to-r from-blue-500 to-cyan-400",
      textColor: "text-white",
      accentColor: "bg-blue-200",
      slides: 5,
      slideContent: [
        {
          title: "5 LinkedIn Growth Strategies",
          content: "Proven tactics to boost your profile visibility and grow your network",
          layout: "title-only"
        },
        {
          title: "1. Post Consistently",
          content: "Studies show that posting 2-3 times per week increases your visibility by 30%",
          layout: "split"
        },
        {
          title: "2. Engage With Others",
          content: "Comment on and share posts from others in your industry to build relationships",
          layout: "split"
        },
        {
          title: "3. Optimize Your Profile",
          content: "Use keywords in your headline and about section to increase discoverability",
          layout: "split"
        },
        {
          title: "Ready to grow your LinkedIn presence?",
          content: "Follow these strategies consistently for 30 days and watch your network expand",
          layout: "cta"
        }
      ]
    },
    {
      id: 2,
      title: "The Future of Remote Work",
      subtitle: "Data-driven insights for 2023 and beyond",
      category: "Workplace Trends",
      tone: "Informative tone",
      color: "bg-gradient-to-br from-purple-600 to-pink-500",
      textColor: "text-white", 
      accentColor: "bg-purple-200",
      slides: 7,
      slideContent: [
        {
          title: "The Future of Remote Work",
          content: "Data-driven insights for organizations adapting to the new normal",
          layout: "title-only"
        },
        {
          title: "Remote Work Adoption",
          content: "58% of knowledge workers now work in hybrid arrangements, up from 12% in 2019",
          layout: "header-content"
        },
        {
          title: "Productivity Impact",
          content: "Remote workers report 22% higher productivity when given flexible arrangements",
          layout: "header-content"
        },
        {
          title: "Challenges to Address",
          content: "Communication gaps, team cohesion, and work-life boundaries remain key concerns",
          layout: "header-content"
        },
        {
          title: "Get our comprehensive remote work report",
          content: "Download the full analysis with actionable recommendations",
          layout: "cta"
        }
      ]
    },
    {
      id: 3,
      title: "Content Creation Workflow",
      subtitle: "Step-by-step guide to streamline your process",
      category: "Content Marketing",
      tone: "Educational tone",
      color: "bg-gradient-to-r from-amber-500 to-orange-600",
      textColor: "text-white",
      accentColor: "bg-amber-300",
      slides: 6,
      slideContent: [
        {
          title: "Content Creation Workflow",
          content: "A proven system to produce high-quality content consistently",
          layout: "title-only"
        },
        {
          title: "Step 1: Research & Planning",
          content: "Identify topics, keywords, and audience needs before writing",
          layout: "step"
        },
        {
          title: "Step 2: Create an Outline",
          content: "Structure your content with key points and supporting details",
          layout: "step"
        },
        {
          title: "Step 3: Draft & Edit",
          content: "Write freely, then refine for clarity, accuracy, and engagement",
          layout: "step"
        },
        {
          title: "Want the full workflow template?",
          content: "Download our content creation system with checklists and tools",
          layout: "cta"
        }
      ]
    }
  ];
  
  const remainingCredits = 3;

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#carousel') {
      navigate('/dashboard/request-carousel');
    }
  }, [navigate]);

  const handleTabChange = (value: string) => {
    if (value === 'carousel') {
      // Keep this tab active but prepare to navigate if user clicks on a specific option
    }
  };

  const handlePreviewOpen = (carouselId: number) => {
    setPreviewCarousel(carouselId);
    setCurrentSlide(0);
  };

  const handlePreviewClose = () => {
    setPreviewCarousel(null);
    setCurrentSlide(0);
  };

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
    
    setTimeout(() => {
      setGeneratingImage(false);
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

      <Tabs defaultValue="text" onValueChange={handleTabChange}>
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
          <div className="py-8">
            <h3 className="text-2xl font-semibold mb-2">LinkedIn Carousel Posts</h3>
            <p className="text-muted-foreground mb-8">
              Choose a carousel style below and create eye-catching multi-slide content that drives engagement
            </p>
            
            <div className="mb-8">
              <Label htmlFor="slider-type" className="text-lg font-medium mb-2 block">Select Carousel Type</Label>
              <Select 
                value={sliderType} 
                onValueChange={(value) => setSliderType(value as SliderType)}
              >
                <SelectTrigger id="slider-type" className="w-full max-w-md">
                  <SelectValue placeholder="Select slider type" />
                </SelectTrigger>
                <SelectContent>
                  {SliderTypeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-2">
                Each style offers different layout options and transitions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCarousels.map(carousel => (
                <Card key={carousel.id} className="overflow-hidden transition-all hover:shadow-md">
                  <div className={`aspect-video ${carousel.color} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center px-6">
                        <h4 className="text-xl font-bold">{carousel.title}</h4>
                        <p className="text-sm mt-2 opacity-90">{carousel.subtitle}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white text-blue-500 rounded-full text-xs px-2 py-1">
                      {carousel.slides} slides
                    </div>
                    <button 
                      className="absolute top-3 right-3 bg-white bg-opacity-20 backdrop-blur-sm p-1 rounded-full hover:bg-opacity-30 transition-all"
                      onClick={() => handlePreviewOpen(carousel.id)}
                    >
                      <Eye size={16} className="text-white" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{carousel.category}</p>
                        <p className="text-xs text-muted-foreground">{carousel.tone}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/request-carousel')}>
                        Customize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-video bg-gradient-to-br from-emerald-500 to-teal-500 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center px-6">
                      <h4 className="text-xl font-bold">7 AI Tools for Marketers</h4>
                      <p className="text-sm mt-2 opacity-90">Boost productivity with these AI-powered solutions</p>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white text-emerald-600 rounded-full text-xs px-2 py-1">
                    8 slides
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Marketing Tech</p>
                      <p className="text-xs text-muted-foreground">Practical tone</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/request-carousel')}>
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-video bg-gradient-to-r from-slate-700 to-slate-900 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center px-6">
                      <h4 className="text-xl font-bold">Q2 Market Analysis</h4>
                      <p className="text-sm mt-2 opacity-90">Key insights and trends for business leaders</p>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white text-slate-700 rounded-full text-xs px-2 py-1">
                    10 slides
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Business Intelligence</p>
                      <p className="text-xs text-muted-foreground">Corporate tone</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/request-carousel')}>
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-video bg-gradient-to-br from-rose-500 to-red-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center px-6">
                      <h4 className="text-xl font-bold">Brand Storytelling Guide</h4>
                      <p className="text-sm mt-2 opacity-90">Connect with your audience through powerful stories</p>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white text-rose-600 rounded-full text-xs px-2 py-1">
                    6 slides
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Brand Strategy</p>
                      <p className="text-xs text-muted-foreground">Inspirational tone</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/request-carousel')}>
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-lg font-medium mb-4">Don't see what you're looking for?</p>
              <Button size="lg" onClick={() => navigate('/dashboard/request-carousel')}>
                Request Custom Carousel
              </Button>
            </div>
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
      
      <Dialog open={previewCarousel !== null} onOpenChange={() => handlePreviewClose()}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
          {previewCarousel !== null && (() => {
            const carousel = sampleCarousels.find(c => c.id === previewCarousel);
            if (!carousel) return null;
            
            return (
              <div className="relative">
                <button 
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
                  onClick={handlePreviewClose}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>

                <button 
                  className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
                  onClick={() => setShowSliderOptions(!showSliderOptions)}
                >
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Slider Options</span>
                </button>
                
                {showSliderOptions && (
                  <div className="absolute left-4 top-12 bg-white dark:bg-gray-900 shadow-lg rounded-md p-4 z-20 w-60">
                    <h4 className="text-sm font-medium mb-2">Slider Type</h4>
                    <Select 
                      value={sliderType} 
                      onValueChange={(value) => setSliderType(value as SliderType)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select slider type" />
                      </SelectTrigger>
                      <SelectContent>
                        {SliderTypeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <SliderTypes 
                  slides={carousel.slideContent}
                  color={carousel.color}
                  textColor={carousel.textColor}
                  accentColor={carousel.accentColor}
                  sliderType={sliderType}
                />
                
                <div className="border-t p-4">
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      handlePreviewClose();
                      navigate('/dashboard/request-carousel');
                    }}
                  >
                    Customize This Template
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
      
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
