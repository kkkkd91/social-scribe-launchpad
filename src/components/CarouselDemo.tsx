
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  Circle, 
  Play, 
  Pause,
  ImageIcon
} from "lucide-react";

interface CarouselDemoProps {
  type: 
    | "basic" 
    | "pagination" 
    | "gallery" 
    | "looped" 
    | "autoplay" 
    | "multi-slide" 
    | "grid" 
    | "coverflow" 
    | "fade" 
    | "vertical" 
    | "thumbs" 
    | "parallax";
  title?: string;
  images?: string[];
}

const defaultImages = [
  "/lovable-uploads/slide1.jpg",
  "/lovable-uploads/slide2.jpg",
  "/lovable-uploads/slide3.jpg",
  "/lovable-uploads/slide4.jpg",
  "/lovable-uploads/slide5.jpg",
];

export function CarouselDemo({ type = "basic", title, images = defaultImages }: CarouselDemoProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(type === "autoplay");
  const [activeThumb, setActiveThumb] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const totalSlides = images.length;

  // For thumbs gallery
  const [selectedThumb, setSelectedThumb] = useState(0);

  // Handle slide changes
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    if (type === "thumbs") {
      setSelectedThumb(index);
    }
  };

  // Autoplay functionality
  useEffect(() => {
    if (type === "autoplay" && isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, 3000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, totalSlides, type]);

  // Stop autoplay on hover
  const handleMouseEnter = () => {
    if (type === "autoplay" && isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Resume autoplay on mouse leave
  const handleMouseLeave = () => {
    if (type === "autoplay" && isPlaying && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, 3000);
    }
  };

  // Configure carousel options based on type
  const getCarouselOptions = () => {
    switch (type) {
      case "looped":
        return { loop: true };
      case "vertical":
        return { orientation: "vertical" };
      case "multi-slide":
        return { 
          loop: true,
          dragFree: true 
        };
      case "coverflow":
        return { 
          loop: true,
          startIndex: 1 
        };
      default:
        return {};
    }
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-primary scale-125" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  const renderThumbnails = () => {
    return (
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedThumb(index);
              handleSlideChange(index);
            }}
            className={`relative rounded-md overflow-hidden transition-all ${
              selectedThumb === index 
                ? "ring-2 ring-primary ring-offset-2" 
                : "ring-1 ring-gray-200 opacity-70 hover:opacity-100"
            }`}
            style={{ flexShrink: 0 }}
          >
            <img 
              src={img} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-20 h-14 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
      {title && <h3 className="text-xl font-medium mb-4 text-center">{title}</h3>}
      
      <div 
        className={`relative ${type === "vertical" ? "h-[400px]" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Carousel 
          opts={getCarouselOptions()}
          className={`w-full ${type === "coverflow" ? "overflow-visible" : ""}`}
          onSelect={(api) => {
            if (api) {
              const selected = api.selectedScrollSnap();
              setCurrentSlide(selected);
              if (type === "thumbs") {
                setSelectedThumb(selected);
              }
            }
          }}
        >
          <CarouselContent className={`
            ${type === "vertical" ? "-mt-4 h-[400px] flex-col" : "-ml-4"} 
            ${type === "grid" ? "grid grid-cols-2 md:grid-cols-3" : ""}
            ${type === "fade" ? "relative" : ""}
            ${type === "coverflow" ? "items-center" : ""}
          `}>
            {images.map((image, index) => (
              <CarouselItem 
                key={index} 
                className={`
                  ${type === "vertical" ? "pt-4" : "pl-4"} 
                  ${type === "grid" ? "basis-1/2 md:basis-1/3" : ""}
                  ${type === "multi-slide" ? "basis-1/1 md:basis-1/2 lg:basis-1/3" : ""}
                  ${type === "coverflow" ? `
                    transition-all duration-300 
                    ${currentSlide === index ? "scale-110 z-10" : "scale-90 opacity-70"}
                  ` : ""}
                  ${type === "fade" ? `
                    absolute inset-0 transition-opacity duration-1000
                    ${currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"}
                  ` : ""}
                  ${type === "parallax" ? "overflow-hidden" : ""}
                `}
              >
                <div className={`relative rounded-lg overflow-hidden ${type === "gallery" ? "aspect-[16/9]" : "aspect-square"}`}>
                  <img 
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={`w-full h-full object-cover ${
                      type === "parallax" ? `transform transition-transform duration-1000 scale-[1.2] ${
                        index === currentSlide ? "translate-y-[-5%]" : ""
                      }` : ""
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                      (e.target as HTMLImageElement).className = "w-full h-full flex items-center justify-center bg-muted";
                      const container = document.createElement("div");
                      container.className = "flex items-center justify-center";
                      const icon = document.createElement("div");
                      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;
                      container.appendChild(icon);
                      (e.target as HTMLImageElement).parentNode?.appendChild(container);
                    }}
                  />
                  
                  {type === "gallery" && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                      Slide {index + 1} of {images.length}
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {type !== "fade" && (
            <>
              <CarouselPrevious className={`
                -left-4 md:-left-5 
                ${type === "basic" || type === "gallery" ? "" : "hidden"}
                ${type === "vertical" ? "rotate-90 -top-12 left-1/2 -translate-x-1/2" : ""}
              `} />
              <CarouselNext className={`
                -right-4 md:-right-5 
                ${type === "basic" || type === "gallery" ? "" : "hidden"}
                ${type === "vertical" ? "rotate-90 -bottom-12 left-1/2 -translate-x-1/2" : ""}
              `} />
            </>
          )}
        </Carousel>

        {/* Custom Navigation Controls */}
        {(type === "looped" || type === "coverflow" || type === "parallax" || type === "fade") && (
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
              }}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
              }}
              className="flex items-center gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Pagination */}
        {(type === "pagination" || type === "gallery") && renderPagination()}

        {/* Autoplay Controls */}
        {type === "autoplay" && (
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Play
                </>
              )}
            </Button>
          </div>
        )}

        {/* Thumbnails */}
        {type === "thumbs" && renderThumbnails()}
      </div>
    </div>
  );
}

export default CarouselDemo;
