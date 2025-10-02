import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RatingSystemProps {
  onRate?: (rating: number) => void;
}

const ratingLabels = ["Poor", "Good", "Average", "Best", "Awesome"];

export function RatingSystem({ onRate }: RatingSystemProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRate = (value: number) => {
    setRating(value);
    onRate?.(value);
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <Button
          key={value}
          variant="ghost"
          size="sm"
          className="p-0 h-6 w-6"
          onMouseEnter={() => setHover(value)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRate(value)}
        >
          <Star
            className={`h-4 w-4 ${
              value <= (hover || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            }`}
          />
        </Button>
      ))}
      {(hover || rating) > 0 && (
        <span className="text-xs text-muted-foreground ml-2">
          {ratingLabels[(hover || rating) - 1]}
        </span>
      )}
    </div>
  );
}
