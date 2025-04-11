import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      aria-label="Light theme enabled"
      disabled
    >
      <Sun className="h-5 w-5" />
    </Button>
  );
};

export default ThemeToggle;
