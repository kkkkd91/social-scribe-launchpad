
import { Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
  animated?: boolean;
}

const Logo = ({ className, showText = true, textClassName, animated = false }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "flex items-center text-brand-teal transition-transform",
        animated && "hover:scale-110 duration-300"
      )}>
        <Headphones size={28} className="text-gradient-bg p-1 rounded-md" />
      </div>
      {showText && (
        <span className={cn("font-semibold text-lg", textClassName)}>
          social<span className="gradient-text">scribe</span>
          <span className="text-xs align-top text-brand-coral">.</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
