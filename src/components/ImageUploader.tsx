
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Image, UploadCloud, Wand2 } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
  remainingCredits: number;
  onSubscriptionNeeded?: () => void;
}

const ImageUploader = ({ onImageSelected, remainingCredits, onSubscriptionNeeded }: ImageUploaderProps) => {
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIImage = () => {
    if (remainingCredits <= 0) {
      if (onSubscriptionNeeded) {
        onSubscriptionNeeded();
      }
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
    
    // Simulate AI image generation - in a real app, this would call your AI service
    setTimeout(() => {
      setGeneratingImage(false);
      // Placeholder image URL
      onImageSelected("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500");
      toast({
        title: "Success",
        description: "AI image generated successfully"
      });
      setAiPrompt("");
    }, 2000);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Image size={16} />
          Add Image
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add Image to Post</SheetTitle>
          <SheetDescription>
            Upload an image or generate one with AI
          </SheetDescription>
        </SheetHeader>
        
        <Tabs defaultValue="upload" className="mt-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="generate">AI Generate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="picture">Upload from device</Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              
              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop an image, or click to browse
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="generate" className="mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="ai-prompt">Describe the image you want</Label>
                <Textarea
                  id="ai-prompt"
                  placeholder="A professional LinkedIn profile photo with a clean background..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              
              {remainingCredits <= 0 ? (
                <div className="bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 p-3 rounded-md">
                  <p className="text-sm">
                    You've used all your AI image credits. Upgrade your plan to generate more images.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 bg-amber-100 dark:bg-amber-800/20 border-amber-200 dark:border-amber-800"
                    onClick={onSubscriptionNeeded}
                  >
                    Upgrade Plan
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={generateAIImage} 
                  disabled={generatingImage || !aiPrompt.trim()}
                  className="w-full"
                >
                  {generatingImage ? "Generating..." : "Generate Image"}
                </Button>
              )}
              
              <p className="text-xs text-muted-foreground text-center">
                Credits remaining: {remainingCredits}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default ImageUploader;
