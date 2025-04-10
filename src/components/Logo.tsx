
import { Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

const Logo = ({ className, showText = true, textClassName }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center text-primary">
        <Headphones size={24} className="text-primary" />
      </div>
      {showText && (
        <span className={cn("font-semibold text-lg", textClassName)}>
          social<span className="text-primary">scribe</span>
          <span className="text-xs align-top">.</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
