
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

interface Slide {
  title: string;
  content: string;
  layout: string;
}

interface SliderProps {
  slides: Slide[];
  sliderType: SliderType;
}

export type SliderType = 
  | "basic" 
  | "pagination" 
  | "autoplay" 
  | "multi-slide" 
  | "fade" 
  | "coverflow" 
  | "vertical"
  | "loop";

export const SliderTypeOptions = [
  { value: "basic", label: "Basic Slider" },
  { value: "pagination", label: "Slider with Pagination" },
  { value: "autoplay", label: "Autoplay Slider" },
  { value: "multi-slide", label: "Multi-Slide Carousel" },
  { value: "fade", label: "Fade Effect Slider" },
  { value: "coverflow", label: "Coverflow Effect" },
  { value: "vertical", label: "Vertical Slider" },
  { value: "loop", label: "Looped Slider" },
];

export const SliderTypes = ({ slides, sliderType }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const multiSlideCount = 3;
  const fadeTransitionDuration = 500;

  // Handle autoplay
  useEffect(() => {
    if (sliderType === "autoplay" && isPlaying) {
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, 3000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [currentSlide, isPlaying, sliderType]);

  const handleNext = () => {
    if (sliderType === "loop") {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    } else if (sliderType === "multi-slide") {
      if (currentSlide < slides.length - multiSlideCount) {
        setCurrentSlide((prev) => prev + 1);
      }
    } else {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (sliderType === "loop") {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    } else {
      if (currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - next slide
      handleNext();
    } else if (touchStart - touchEnd < -50) {
      // Swipe right - previous slide
      handlePrev();
    }
  };

  // Vertical slider height calculation
  const verticalSlideHeight = slideRef.current ? slideRef.current.offsetHeight : 300;

  const renderCurrentSlide = (slideData: Slide, index: number) => {
    // Render the slide layout based on type
    const isVisible = 
      sliderType === "multi-slide" 
        ? index >= currentSlide && index < currentSlide + multiSlideCount
        : index === currentSlide;

    const fadeStyle = sliderType === "fade" ? {
      opacity: index === currentSlide ? 1 : 0,
      transition: `opacity ${fadeTransitionDuration}ms ease-in-out`
    } : {};

    const coverflowStyle = sliderType === "coverflow" ? {
      transform: index === currentSlide 
        ? 'scale(1) translateZ(0)'
        : index < currentSlide 
          ? `scale(0.8) translateX(-50px) rotateY(30deg) translateZ(-100px)`
          : `scale(0.8) translateX(50px) rotateY(-30deg) translateZ(-100px)`,
      transformOrigin: 'center center',
      transition: 'transform 0.5s ease-out',
      opacity: index === currentSlide ? 1 : 0.5,
      zIndex: index === currentSlide ? 10 : 1
    } : {};

    return (
      <div 
        key={index}
        style={{
          ...fadeStyle,
          ...coverflowStyle,
          display: 
            sliderType === "fade" || sliderType === "coverflow" 
              ? "block" 
              : isVisible ? "block" : "none",
          width: sliderType === "multi-slide" ? `calc(${100 / multiSlideCount}% - 8px)` : "100%",
          marginRight: sliderType === "multi-slide" ? "8px" : 0,
        }}
        className={`transition-all ${sliderType === "fade" || sliderType === "coverflow" ? "absolute inset-0" : ""}`}
      >
        <div className={`p-6 bg-white border rounded-md shadow h-full`}>
          <h2 className="text-xl font-bold mb-2 text-slate-800">{slideData.title}</h2>
          <div className="h-1 w-16 my-3 bg-primary"></div>
          <p className="text-gray-700">{slideData.content}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div 
        className={`relative overflow-hidden border rounded-md ${
          sliderType === "vertical" ? "h-[300px]" : ""
        }`}
        ref={slideRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className={`
            bg-white p-4 text-foreground
            ${sliderType === "vertical" ? "" : "aspect-[16/9]"}
            ${sliderType === "fade" || sliderType === "coverflow" ? "relative" : ""}
            ${sliderType === "multi-slide" ? "flex" : ""}
          `}
          style={
            sliderType === "vertical" 
              ? { 
                  transform: `translateY(-${currentSlide * verticalSlideHeight}px)`,
                  transition: 'transform 0.5s ease-out' 
                }
              : {}
          }
        >
          {
            slides.map((slide, index) => renderCurrentSlide(slide, index))
          }
        </div>

        {/* Slider Controls */}
        <div className="absolute top-4 right-4 text-xs bg-black bg-opacity-20 px-2 py-1 rounded-full">
          {currentSlide + 1} / {sliderType === "multi-slide" ? slides.length - multiSlideCount + 1 : slides.length}
        </div>

        {/* Navigation Arrows */}
        <button 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition-colors"
          onClick={handlePrev}
          disabled={sliderType === "loop" ? false : currentSlide === 0}
        >
          <ArrowLeft size={20} />
        </button>
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition-colors"
          onClick={handleNext}
          disabled={
            sliderType === "loop" 
              ? false 
              : sliderType === "multi-slide" 
                ? currentSlide >= slides.length - multiSlideCount
                : currentSlide === slides.length - 1
          }
        >
          <ArrowRight size={20} />
        </button>

        {/* Pagination Dots for pagination slider type */}
        {sliderType === "pagination" && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentSlide === index ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        )}

        {/* Autoplay Controls */}
        {sliderType === "autoplay" && (
          <button 
            className="absolute left-4 bottom-4 bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition-colors"
            onClick={handleTogglePlay}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default SliderTypes;
