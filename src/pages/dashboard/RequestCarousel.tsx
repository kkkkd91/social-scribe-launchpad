
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, CheckCircle, ArrowLeft, ArrowRight, X, Eye } from "lucide-react";
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
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderType, setSliderType] = useState<SliderType>("basic");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Enhanced carousel templates with actual design descriptions and mock slide content
  const carouselTemplates = [
    {
      id: 1,
      title: "Minimalist",
      description: "Clean and simple design with focus on content",
      color: "bg-white",
      textColor: "text-gray-800",
      accentColor: "bg-blue-500",
      slides: [
        {
          title: "5 Ways to Increase Your LinkedIn Engagement",
          content: "A clean, minimalist approach to professional content that stands out",
          layout: "title-only"
        },
        {
          title: "1. Post Consistently",
          content: "Studies show that posting 2-3 times per week increases your visibility by 30%",
          layout: "split"
        },
        {
          title: "2. Engage With Others",
          content: "Commenting on others' posts increases your profile visits by 50%",
          layout: "split"
        },
        {
          title: "3. Use Rich Media",
          content: "Posts with images get 98% more comments than text-only posts",
          layout: "split"
        },
        {
          title: "Ready to transform your LinkedIn presence?",
          content: "Contact us today to learn more about our LinkedIn optimization services",
          layout: "cta"
        }
      ]
    },
    {
      id: 2,
      title: "Visual",
      description: "Image-focused design with bold typography",
      color: "bg-gradient-to-br from-indigo-500 to-purple-600",
      textColor: "text-white",
      accentColor: "bg-yellow-400",
      slides: [
        {
          title: "The Future of Remote Work",
          content: "Data-driven insights for the modern workforce",
          layout: "overlay"
        },
        {
          title: "75%",
          content: "of companies plan to maintain remote work options permanently",
          layout: "statistic"
        },
        {
          title: "3 Key Benefits",
          content: "Increased productivity, reduced overhead costs, and improved work-life balance",
          layout: "list"
        },
        {
          title: "Remote Work Tools",
          content: "Video conferencing, project management, and team communication platforms",
          layout: "grid"
        },
        {
          title: "Download our Remote Work Playbook",
          content: "Get our comprehensive guide to building an effective remote team",
          layout: "cta"
        }
      ]
    },
    {
      id: 3,
      title: "Corporate",
      description: "Professional design with branded elements",
      color: "bg-slate-100",
      textColor: "text-slate-800",
      accentColor: "bg-slate-700",
      slides: [
        {
          title: "Q3 Market Analysis",
          content: "Key insights and strategic recommendations for enterprise growth",
          layout: "title-centered"
        },
        {
          title: "Market Overview",
          content: "Industry growth at 4.2% YoY with emerging opportunities in APAC region",
          layout: "header-content"
        },
        {
          title: "Competitive Landscape",
          content: "Top 5 competitors and their market positioning analysis",
          layout: "header-content"
        },
        {
          title: "Strategic Recommendations",
          content: "Focus on digital transformation, customer experience, and operational efficiency",
          layout: "header-content"
        },
        {
          title: "Schedule a Consultation",
          content: "Let our experts help you navigate the changing market landscape",
          layout: "cta"
        }
      ]
    },
    {
      id: 4,
      title: "Creative",
      description: "Engaging and colorful design for high impact",
      color: "bg-gradient-to-r from-pink-500 to-orange-500",
      textColor: "text-white",
      accentColor: "bg-emerald-300",
      slides: [
        {
          title: "7 Creative Marketing Strategies for 2023",
          content: "Bold ideas that will transform your brand's social presence",
          layout: "full-bleed"
        },
        {
          title: "User-Generated Content",
          content: "Leverage your community to create authentic brand stories",
          layout: "image-text"
        },
        {
          title: "Interactive Polls & Quizzes",
          content: "Boost engagement by 78% with interactive content formats",
          layout: "image-text"
        },
        {
          title: "Micro-Influencer Partnerships",
          content: "Higher conversion rates at lower costs than traditional influencer marketing",
          layout: "image-text"
        },
        {
          title: "Ready to get creative?",
          content: "Book a brainstorming session with our creative team today!",
          layout: "cta"
        }
      ]
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
    
    if (!topic || !audience || !tone || !purpose || !ctaText || !selectedTemplate) {
      toast({
        title: "Error",
        description: "Please fill all required fields and select a template",
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
      selectedTemplate,
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

  const handlePreviewOpen = (templateId: number) => {
    setPreviewTemplate(templateId);
    setCurrentSlide(0);
  };

  const handlePreviewClose = () => {
    setPreviewTemplate(null);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    const template = carouselTemplates.find(t => t.id === previewTemplate);
    if (template && currentSlide < template.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  type TemplateProps = {
    id: number;
    title: string;
    description: string;
    color: string;
    textColor: string;
    accentColor: string;
    slides: {
      title: string;
      content: string;
      layout: string;
    }[];
  };

  interface CarouselTemplateCardProps {
    template: TemplateProps;
    isSelected: boolean;
  }

  const CarouselTemplateCard = ({ template, isSelected }: CarouselTemplateCardProps) => (
    <Card 
      className={`cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:shadow-md"
      }`}
    >
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-1">{template.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
        <div className="flex gap-2 mb-3">
          {template.slides.slice(0, 3).map((slide, idx) => (
            <div 
              key={idx} 
              className={`w-20 h-12 rounded overflow-hidden ${template.color}`}
            >
              <div className={`h-full w-full flex flex-col items-center justify-center p-1 text-center ${template.textColor}`}>
                <div className="text-[6px] font-bold truncate w-full">
                  {slide.title}
                </div>
                <div className={`h-1 w-8 my-1 ${template.accentColor}`}></div>
                <div className="text-[5px] truncate w-full">
                  {slide.content.substring(0, 30)}...
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button 
            variant={isSelected ? "default" : "outline"} 
            size="sm" 
            className="flex-1"
            onClick={() => setSelectedTemplate(template.id)}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-2"
            onClick={() => handlePreviewOpen(template.id)}
          >
            <Eye size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const PreviewDialog = () => {
    const template = carouselTemplates.find(t => t.id === previewTemplate);
    if (!template) return null;

    return (
      <Dialog open={previewTemplate !== null} onOpenChange={() => handlePreviewClose()}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
          <button 
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
            onClick={handlePreviewClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          
          <div className="relative">
            <SliderTypes 
              slides={template.slides}
              color={template.color}
              textColor={template.textColor}
              accentColor={template.accentColor}
              sliderType={sliderType}
            />
            
            <div className="border-t p-4">
              <Button 
                className="w-full" 
                onClick={() => {
                  handlePreviewClose();
                }}
              >
                Close Preview
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
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
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
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

          <div className="md:col-span-3 mt-6">
            <h2 className="text-xl font-bold mb-4">Select a Carousel Template</h2>
            <p className="text-muted-foreground mb-6">
              Choose a template style for your carousel. Our team will use this as a starting point.
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {carouselTemplates.map(template => (
                <CarouselTemplateCard 
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate === template.id}
                />
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button 
                size="lg" 
                onClick={handleSubmit}
                disabled={!topic || !audience || !tone || !purpose || !ctaText || !selectedTemplate}
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
              🎉 Your request has been submitted!
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

      <PreviewDialog />
    </div>
  );
};

export default RequestCarousel;
