
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CarouselDemo from "@/components/CarouselDemo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const carouselTypes = [
  { 
    id: "basic", 
    name: "Basic Slider", 
    description: "One slide at a time, horizontal direction. Arrows to navigate." 
  },
  { 
    id: "pagination", 
    name: "Slider with Pagination", 
    description: "Dots (pagination bullets) to indicate and navigate to slides." 
  },
  { 
    id: "gallery", 
    name: "Image Gallery", 
    description: "Full-width image slider with navigation. Great for portfolios." 
  },
  { 
    id: "looped", 
    name: "Looped Slider", 
    description: "Slides loop infinitely. No end — great for continuous content." 
  },
  { 
    id: "autoplay", 
    name: "Autoplay Slider", 
    description: "Automatically transitions between slides. Can be paused on hover." 
  },
  { 
    id: "multi-slide", 
    name: "Multi-Slide Carousel", 
    description: "Shows multiple slides per view. Adjusts based on screen width." 
  },
  { 
    id: "grid", 
    name: "Grid Slider", 
    description: "Slides arranged in a grid (rows and columns)." 
  },
  { 
    id: "coverflow", 
    name: "Coverflow Effect", 
    description: "3D-like effect where center slide is emphasized." 
  },
  { 
    id: "fade", 
    name: "Fade Effect Slider", 
    description: "Cross-fade transition between slides. Smooth and elegant." 
  },
  { 
    id: "vertical", 
    name: "Vertical Slider", 
    description: "Slides move up/down instead of left/right." 
  },
  { 
    id: "thumbs", 
    name: "Thumbs Gallery", 
    description: "Small thumbnails below main image. Clicking thumb changes main image." 
  },
  { 
    id: "parallax", 
    name: "Parallax Slider", 
    description: "Elements move at different speeds for a 3D effect." 
  }
];

const demoImages = [
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
  "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
  "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2625&q=80"
];

const Carousels = () => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="container max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Carousel Examples</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of carousel components with various styles and behaviors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {carouselTypes.map((type) => (
          <Card 
            key={type.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              activeTab === type.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setActiveTab(type.id)}
          >
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{type.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription>{type.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {carouselTypes.find(t => t.id === activeTab)?.name || "Carousel"}
        </h2>

        <div className="bg-slate-50 p-6 rounded-lg">
          <CarouselDemo 
            type={activeTab as any} 
            images={demoImages}
          />
        </div>

        <div className="mt-8 p-4 bg-primary/5 rounded-lg">
          <h3 className="font-medium mb-2">Features:</h3>
          <p className="text-muted-foreground">
            {carouselTypes.find(t => t.id === activeTab)?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carousels;
