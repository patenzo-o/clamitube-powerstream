import { Button } from "@/components/ui/button";
import { Trophy, BookOpen, Video, Eye, Users, Tag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FiltersSectionProps {
  onFilterChange: (filterType: string, value: string) => void;
}

export const FiltersSection = ({ onFilterChange }: FiltersSectionProps) => {
  const categories = ["Mathematics", "Science", "History", "Language Arts", "Technology"];
  const types = ["Video Lessons", "Interactive Courses", "Documentaries", "Tutorials"];
  const viewRanges = ["0-1K", "1K-10K", "10K-100K", "100K+"];
  const channels = ["Educational Content", "Science Channel", "Math Academy", "History Hub"];

  return (
    <div className="w-full bg-card/50 backdrop-blur-sm border-t border-b py-6 my-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => onFilterChange("leaderboard", "top")}
          >
            <Trophy size={18} />
            Leaderboard
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <BookOpen size={18} />
                Category
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background z-50">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => onFilterChange("category", category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Video size={18} />
                Type
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background z-50">
              {types.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => onFilterChange("type", type)}
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Eye size={18} />
                Views
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background z-50">
              {viewRanges.map((range) => (
                <DropdownMenuItem
                  key={range}
                  onClick={() => onFilterChange("views", range)}
                >
                  {range}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Users size={18} />
                Channel
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background z-50">
              {channels.map((channel) => (
                <DropdownMenuItem
                  key={channel}
                  onClick={() => onFilterChange("channel", channel)}
                >
                  {channel}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="gap-2">
            <Tag size={18} />
            Tag Search
          </Button>
        </div>
      </div>
    </div>
  );
};
