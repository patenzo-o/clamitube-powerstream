import { cn } from "@/lib/utils";
import logoImage from "@/assets/clamastream-logo.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img 
        src={logoImage} 
        alt="Clamastream Logo" 
        className={cn("transition-smooth hover:shadow-glow", sizeClasses[size])}
      />
      <span className="font-bold text-2xl bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
        Clamastream
      </span>
    </div>
  );
}