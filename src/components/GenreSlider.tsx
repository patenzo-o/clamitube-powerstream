import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

interface GenreSliderProps {
  onGenreSelect?: (genre: string) => void;
}

const genres = [
  "All",
  "Mathematics",
  "Science",
  "History",
  "Language Arts",
  "Technology",
  "Arts",
  "Music",
  "Physical Education",
  "Social Studies",
];

export function GenreSlider({ onGenreSelect }: GenreSliderProps = {}) {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    onGenreSelect?.(genre);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-background border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            className="shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                onClick={() => handleGenreSelect(genre)}
                className="whitespace-nowrap shrink-0"
                size="sm"
              >
                {genre}
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            className="shrink-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
