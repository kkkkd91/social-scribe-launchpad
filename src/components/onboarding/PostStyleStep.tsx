import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample content for each post style with different lengths
const postExamples = {
  standard: {
    short: "Just launched our new product! Very excited about the potential impact on our industry.",
    medium: "Just launched our new product! Very excited about the potential impact on our industry. Our team has been working tirelessly to bring this innovation to market, and the initial feedback has been incredible.",
    long: "Just launched our new product! Very excited about the potential impact on our industry. Our team has been working tirelessly to bring this innovation to market, and the initial feedback has been incredible. This represents a significant step forward in addressing key customer pain points while setting new standards for quality and performance. Looking forward to sharing more details in the coming weeks!"
  },
  formatted: {
    short: "3 Reasons Why Content Marketing Matters:\n• Builds brand awareness\n• Drives qualified traffic\n• Establishes authority",
    medium: "3 Reasons Why Content Marketing Matters:\n\n• Builds brand awareness by consistently delivering valuable content to your target audience\n• Drives qualified traffic to your website through SEO-optimized blog posts and articles\n• Establishes authority in your industry by sharing expert insights",
    long: "3 Reasons Why Content Marketing Matters:\n\n• Builds brand awareness by consistently delivering valuable content to your target audience, keeping your brand top-of-mind when purchase decisions are made\n\n• Drives qualified traffic to your website through SEO-optimized blog posts and articles, resulting in higher conversion rates and better ROI\n\n• Establishes authority in your industry by sharing expert insights and thought leadership content that positions you as a trusted resource"
  },
  chunky: {
    short: "BIG NEWS! 🎉\nOur startup just secured Series A funding!",
    medium: "BIG NEWS! 🎉\n\nOur startup just secured Series A funding!\n\nThis investment will accelerate our growth and help us bring our solution to more customers.",
    long: "BIG NEWS! 🎉\n\nOur startup just secured Series A funding!\n\nThis investment will accelerate our growth and help us bring our solution to more customers.\n\nWe're now hiring across all departments - check out our careers page to join our journey.\n\n#StartupLife #FundingAnnouncement #NowHiring"
  },
  short: {
    short: "Sometimes less is more.",
    medium: "Sometimes less is more. Focus on what matters.",
    long: "Sometimes less is more. Focus on what matters. Simplicity wins."
  },
  emojis: {
    short: "🚀 Just hit a major milestone! 🎯",
    medium: "🚀 Just hit a major milestone! \n💡 10,000 users \n🔥 Featured in TechCrunch \n🎯 On track for our Q3 goals",
    long: "🚀 Just hit a major milestone! \n\n💡 10,000 users on our platform \n💪 Growing 25% month over month \n🏆 #1 in our category \n🔥 Featured in TechCrunch \n📈 Revenue increased 40% \n🎯 On track for our Q3 goals \n\n🙏 Thanks to our amazing team and customers!"
  }
};

const PostStyleStep = () => {
  const { nextStep, setPostStyle, postStyle, setPostFrequency, postFrequency } = useOnboarding();
  const [contentLength, setContentLength] = useState<number>(postFrequency || 50);
  const [previewStyle, setPreviewStyle] = useState<"standard" | "formatted" | "chunky" | "short" | "emojis" | null>(postStyle);

  // Update length display based on slider
  const getLengthLabel = (value: number) => {
    if (value < 33) return "Short";
    if (value < 66) return "Medium";
    return "Long";
  };

  // Get post content based on length
  const getPostContent = (style: "standard" | "formatted" | "chunky" | "short" | "emojis", length: number) => {
    if (length < 33) return postExamples[style].short;
    if (length < 66) return postExamples[style].medium;
    return postExamples[style].long;
  };

  const handleSelectStyle = (style: "standard" | "formatted" | "chunky" | "short" | "emojis") => {
    setPostStyle(style);
    nextStep();
  };

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setContentLength(newValue);
    setPostFrequency(newValue);
  };

  // Set preview style when user hovers over a style card
  const handleStylePreview = (style: "standard" | "formatted" | "chunky" | "short" | "emojis") => {
    setPreviewStyle(style);
  };

  // Reset preview to selected style when not hovering
  const handleResetPreview = () => {
    setPreviewStyle(postStyle);
  };

  useEffect(() => {
    // Initialize with the currently selected style
    setPreviewStyle(postStyle);
  }, [postStyle]);

  return (
    <div className="w-full max-w-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Pick your preferred post formatting style</h1>
        <p className="text-muted-foreground">
          SocialScribe is trained on millions of viral posts. The best performing posts will be used as a reference.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left side - Preview */}
        <div className="lg:col-span-7 lg:order-1 order-2">
          <div className="bg-background border rounded-lg p-6 shadow-sm h-full">
            <h2 className="text-xl font-medium mb-4 border-b pb-2">Post Preview</h2>
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src="/avatars/user-01.png" alt="User" />
                <AvatarFallback>SL</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">CEO at TechInnovate • 1h</p>
              </div>
            </div>
            <div className="whitespace-pre-line text-base mb-6 min-h-[250px] bg-white p-4 rounded-md border">
              {previewStyle ? getPostContent(previewStyle, contentLength) : "Select a post style to see a preview"}
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-20 bg-muted rounded-full"></div>
              <div className="h-6 w-20 bg-muted rounded-full"></div>
              <div className="h-6 w-20 bg-muted rounded-full"></div>
            </div>

            {/* Length control */}
            <div className="mt-8 bg-background p-4 rounded-md border">
              <div className="flex justify-between mb-2 items-center">
                <span className="font-medium">Post Length</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {getLengthLabel(contentLength)}
                </span>
              </div>
              <Slider 
                value={[contentLength]} 
                onValueChange={handleSliderChange}
                max={100} 
                step={1} 
                className="mb-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                SocialScribe will learn your individual preferences over time.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Style selection */}
        <div className="lg:col-span-5 lg:order-2 order-1">
          <div className="bg-background border rounded-lg p-6 shadow-sm h-full">
            <h2 className="text-xl font-medium mb-4 border-b pb-2">Select a Style</h2>
            <div className="space-y-3">
              <div 
                className={`p-4 cursor-pointer border hover:border-primary transition-colors rounded-lg ${
                  postStyle === "standard" ? "border-primary border-2 bg-primary/5" : "border-muted"
                }`}
                onClick={() => setPostStyle("standard")}
                onMouseEnter={() => handleStylePreview("standard")}
                onMouseLeave={handleResetPreview}
              >
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-white rounded-md w-14 h-14 flex-shrink-0 flex items-center justify-center border">
                    <div className="w-8 h-8 rounded-md bg-primary/20"></div>
                  </div>
                  <div>
                    <p className="font-medium text-lg">Standard</p>
                    <p className="text-sm text-muted-foreground">Simple, clean paragraph format for professional posts</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 cursor-pointer border hover:border-primary transition-colors rounded-lg ${
                  postStyle === "formatted" ? "border-primary border-2 bg-primary/5" : "border-muted"
                }`}
                onClick={() => setPostStyle("formatted")}
                onMouseEnter={() => handleStylePreview("formatted")}
                onMouseLeave={handleResetPreview}
              >
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-white rounded-md w-14 h-14 flex-shrink-0 flex items-center justify-center border">
                    <div className="space-y-1 w-full">
                      <div className="h-1.5 bg-primary/20 rounded-full w-full"></div>
                      <div className="h-1.5 bg-primary/20 rounded-full w-3/4 ml-2"></div>
                      <div className="h-1.5 bg-primary/20 rounded-full w-2/3 ml-2"></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-lg">Formatted</p>
                    <p className="text-sm text-muted-foreground">Bulleted lists with clear structure for easy readability</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 cursor-pointer border hover:border-primary transition-colors rounded-lg ${
                  postStyle === "chunky" ? "border-primary border-2 bg-primary/5" : "border-muted"
                }`}
                onClick={() => setPostStyle("chunky")}
                onMouseEnter={() => handleStylePreview("chunky")}
                onMouseLeave={handleResetPreview}
              >
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-white rounded-md w-14 h-14 flex-shrink-0 flex items-center justify-center border">
                    <div className="space-y-1 w-full">
                      <div className="h-1.5 bg-primary/20 rounded-full w-full"></div>
                      <div className="h-3 bg-primary/20 rounded-md w-full mt-1"></div>
                      <div className="h-1.5 bg-primary/20 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-lg">Chunky</p>
                    <p className="text-sm text-muted-foreground">Bold statements with paragraph breaks for impact</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 cursor-pointer border hover:border-primary transition-colors rounded-lg ${
                  postStyle === "short" ? "border-primary border-2 bg-primary/5" : "border-muted"
                }`}
                onClick={() => setPostStyle("short")}
                onMouseEnter={() => handleStylePreview("short")}
                onMouseLeave={handleResetPreview}
              >
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-white rounded-md w-14 h-14 flex-shrink-0 flex items-center justify-center border">
                    <div className="space-y-1 w-full">
                      <div className="h-1.5 bg-primary/20 rounded-full w-2/3"></div>
                      <div className="h-1.5 bg-primary/20 rounded-full w-1/2 mt-1"></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-lg">Short</p>
                    <p className="text-sm text-muted-foreground">Brief, concise messages that get straight to the point</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 cursor-pointer border hover:border-primary transition-colors rounded-lg ${
                  postStyle === "emojis" ? "border-primary border-2 bg-primary/5" : "border-muted"
                }`}
                onClick={() => setPostStyle("emojis")}
                onMouseEnter={() => handleStylePreview("emojis")}
                onMouseLeave={handleResetPreview}
              >
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-white rounded-md w-14 h-14 flex-shrink-0 flex items-center justify-center border">
                    <div className="space-y-1 w-full">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-yellow-400 mr-1 flex-shrink-0"></div>
                        <div className="h-1.5 bg-gray-200 rounded-full w-3/4"></div>
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="h-3 w-3 rounded-full bg-green-400 mr-1 flex-shrink-0"></div>
                        <div className="h-1.5 bg-gray-200 rounded-full w-2/3"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-lg">Emojis</p>
                    <p className="text-sm text-muted-foreground">Emoji-rich, visual content for an engaging feel</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button 
                onClick={() => handleSelectStyle(previewStyle || "standard")} 
                size="lg"
                className="w-full"
                disabled={!previewStyle}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostStyleStep;
