
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useOnboarding } from "@/contexts/OnboardingContext";

const PostStyleStep = () => {
  const { nextStep, setPostStyle, postStyle } = useOnboarding();

  const handleSelectStyle = (style: "standard" | "formatted" | "chunky" | "short" | "emojis") => {
    setPostStyle(style);
    nextStep();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">Pick your preferred post formatting style</h1>
      <p className="text-muted-foreground mb-8">
        SocialScribe is trained on millions of viral posts. When you create posts, 
        the best performing posts about the same topics will be used as a reference.
      </p>

      <div className="grid grid-cols-5 gap-4 mb-8">
        <Card
          className={`p-4 cursor-pointer border-2 hover:border-primary transition-colors ${
            postStyle === "standard" ? "border-primary" : ""
          }`}
          onClick={() => setPostStyle("standard")}
        >
          <div className="flex flex-col items-center">
            <div className="mb-4 p-2 bg-background border rounded-md w-full">
              <div className="w-8 h-8 rounded-md bg-primary/20 mb-2"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full mb-1"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mb-1"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6"></div>
            </div>
            <p className="text-sm font-medium">Standard</p>
          </div>
        </Card>

        <Card
          className={`p-4 cursor-pointer border-2 hover:border-primary transition-colors ${
            postStyle === "formatted" ? "border-primary" : ""
          }`}
          onClick={() => setPostStyle("formatted")}
        >
          <div className="flex flex-col items-center">
            <div className="mb-4 p-2 bg-background border rounded-md w-full">
              <div className="w-8 h-8 rounded-md bg-primary/20 mb-2"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full mb-3"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 mb-1 ml-2"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-2/3 mb-1 ml-2"></div>
            </div>
            <p className="text-sm font-medium">Formatted</p>
          </div>
        </Card>

        <Card
          className={`p-4 cursor-pointer border-2 hover:border-primary transition-colors ${
            postStyle === "chunky" ? "border-primary" : ""
          }`}
          onClick={() => setPostStyle("chunky")}
        >
          <div className="flex flex-col items-center">
            <div className="mb-4 p-2 bg-background border rounded-md w-full">
              <div className="w-8 h-8 rounded-md bg-primary/20 mb-2"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full mb-3"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full mb-2"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-4/5"></div>
            </div>
            <p className="text-sm font-medium">Chunky</p>
          </div>
        </Card>

        <Card
          className={`p-4 cursor-pointer border-2 hover:border-primary transition-colors ${
            postStyle === "short" ? "border-primary" : ""
          }`}
          onClick={() => setPostStyle("short")}
        >
          <div className="flex flex-col items-center">
            <div className="mb-4 p-2 bg-background border rounded-md w-full">
              <div className="w-8 h-8 rounded-md bg-primary/20 mb-2"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-2/3 mb-1"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2"></div>
            </div>
            <p className="text-sm font-medium">Short</p>
          </div>
        </Card>

        <Card
          className={`p-4 cursor-pointer border-2 hover:border-primary transition-colors ${
            postStyle === "emojis" ? "border-primary" : ""
          }`}
          onClick={() => setPostStyle("emojis")}
        >
          <div className="flex flex-col items-center">
            <div className="mb-4 p-2 bg-background border rounded-md w-full">
              <div className="w-8 h-8 rounded-md bg-primary/20 mb-2"></div>
              <div className="flex mb-1">
                <div className="h-3 w-3 rounded-full bg-yellow-400 mr-1"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4"></div>
              </div>
              <div className="flex mb-1">
                <div className="h-3 w-3 rounded-full bg-green-400 mr-1"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-2/3"></div>
              </div>
              <div className="flex">
                <div className="h-3 w-3 rounded-full bg-blue-400 mr-1"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2"></div>
              </div>
            </div>
            <p className="text-sm font-medium">Emojis</p>
          </div>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-lg mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm">Post length</span>
          <span className="text-sm font-medium">Super long</span>
        </div>
        <Slider 
          defaultValue={[75]} 
          max={100} 
          step={1} 
          className="mb-2"
        />
        <p className="text-sm text-muted-foreground">
          SocialScribe will learn your individual preferences over time.
        </p>
      </div>

      <Button 
        onClick={() => nextStep()} 
        className="mt-4"
      >
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default PostStyleStep;
