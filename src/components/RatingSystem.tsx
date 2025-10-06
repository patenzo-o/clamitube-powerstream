import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RatingSystemProps {
  onRate?: (rating: number) => void;
}

const ratingLabels: Record<number, string> = {
  0.5: "Starter",
  1: "Poor",
  1.5: "Slow Starter",
  2: "Good",
  2.5: "Classic",
  3: "Average",
  3.5: "Better",
  4: "Excellent",
  4.5: "Superior",
  5: "Outstanding"
};

export function RatingSystem({ onRate }: RatingSystemProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRate = (value: number) => {
    setRating(value);
    onRate?.(value);
  };

  const renderStar = (position: number) => {
    const fullStars = Math.floor(hover || rating);
    const hasHalfStar = (hover || rating) - fullStars >= 0.5;
    
    if (position <= fullStars) {
      return "fill-yellow-400 text-yellow-400";
    } else if (position === fullStars + 1 && hasHalfStar) {
      return "half-fill text-yellow-400";
    }
    return "text-muted-foreground";
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <div key={value} className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-6 w-6"
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleRate(value)}
          >
            <Star className={`h-4 w-4 ${renderStar(value)}`} />
          </Button>
          {/* Half star click area */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-0 left-0 p-0 h-6 w-3 opacity-0"
            onMouseEnter={() => setHover(value - 0.5)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleRate(value - 0.5)}
          />
        </div>
      ))}
      {(hover || rating) > 0 && (
        <span className="text-xs text-muted-foreground ml-2">
          {ratingLabels[hover || rating]}
        </span>
      )}
    </div>
  );
}