
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SliderTypes, { SliderType, SliderTypeOptions } from "@/components/carousel/SliderTypes";

const RequestCarousel = () => {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sliderType, setSliderType] = useState<SliderType>("basic");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sample slides for preview
  const sampleSlides = [
    {
      title: "Introduction to Carousels",
      content: "A visual guide to creating effective slide presentations for your audience",
      layout: "title-only"
    },
    {
      title: "Key Benefits",
      content: "Carousels allow you to present multiple pieces of content in a limited space",
      layout: "split"
    },
    {
      title: "Best Practices",
      content: "Keep text concise, use high-quality images, and ensure smooth transitions",
      layout: "header-content"
    },
    {
      title: "Call to Action",
      content: "Ready to create your own stunning carousel? Let us help you get started.",
      layout: "cta"
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic || !audience || !tone || !purpose || !ctaText) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log({
      topic,
      audience,
      tone,
      purpose,
      ctaText,
      uploadedFile,
      sliderType
    });
    
    setIsSubmitted(true);
    toast({
      title: "Success",
      description: "Your carousel request has been submitted!"
    });
  };

  const handleBackToDashboard = () => {
    // Reset form and navigate back
    setIsSubmitted(false);
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Request a Personalized Carousel Post</h1>
        <p className="text-muted-foreground">
          We'll deliver a scroll-stopping LinkedIn carousel post within 24 hours based on your request.
        </p>
      </div>

      {!isSubmitted ? (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="topic">Topic / Post Idea</Label>
                    <Textarea
                      id="topic"
                      placeholder="Describe what you want your carousel to be about..."
                      className="min-h-[100px]"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="audience">Target Audience</Label>
                    <Input
                      id="audience"
                      placeholder="Who is this content for? e.g. Marketing professionals, HR managers, etc."
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tone">Post Tone</Label>
                      <Select 
                        value={tone} 
                        onValueChange={setTone}
                        required
                      >
                        <SelectTrigger id="tone">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="storytelling">Storytelling</SelectItem>
                          <SelectItem value="witty">Witty</SelectItem>
                          <SelectItem value="inspirational">Inspirational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="purpose">Post Purpose</Label>
                      <Select 
                        value={purpose} 
                        onValueChange={setPurpose}
                        required
                      >
                        <SelectTrigger id="purpose">
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="teach">Teach</SelectItem>
                          <SelectItem value="promote">Promote</SelectItem>
                          <SelectItem value="story">Share a Story</SelectItem>
                          <SelectItem value="case-study">Case Study</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cta">CTA Text</Label>
                    <Input
                      id="cta"
                      placeholder="What action should readers take? e.g. Subscribe to our newsletter"
                      value={ctaText}
                      onChange={(e) => setCtaText(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="slider-type">Slider Type</Label>
                    <Select 
                      value={sliderType} 
                      onValueChange={(value) => setSliderType(value as SliderType)}
                      required
                    >
                      <SelectTrigger id="slider-type">
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
                    <p className="text-xs text-muted-foreground mt-1">
                      Select how your carousel slides will transition and behave
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="file">Supporting Documents (Optional)</Label>
                    <div className="mt-1">
                      <Label 
                        htmlFor="file" 
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-1 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, DOC, DOCX, or MP3 (max. 10MB)
                          </p>
                        </div>
                        <Input 
                          id="file" 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx,.mp3"
                          onChange={handleFileUpload}
                        />
                      </Label>
                      {uploadedFile && (
                        <p className="mt-2 text-sm text-gray-500">
                          Uploaded: {uploadedFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Preview</h2>
                <div className="mb-4">
                  <SliderTypes 
                    slides={sampleSlides}
                    sliderType={sliderType}
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  This is how your carousel will transition between slides. The actual content will be based on your inputs.
                </p>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleSubmit}
                disabled={!topic || !audience || !tone || !purpose || !ctaText}
              >
                Submit Request
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-bold mb-4">
              Your request has been submitted!
            </h2>
            <p className="text-lg mb-6">
              You'll receive your personalized carousel via email and in your dashboard within 24 hours.
            </p>
            <Button size="lg" onClick={handleBackToDashboard}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RequestCarousel;
