import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, Trophy, Search, Calendar } from "lucide-react";
import { CommentsSection } from "./CommentsSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DateFinderDialog } from "./DateFinderDialog";

interface ImageCardProps {
  id: string;
  title: string;
  author: string;
  likes: number;
  dislikes: number;
  views: number;
  tags: string[];
  datePublished: string;
  subject: string;
  quality: string;
  rating: number;
  thumbnailUrl: string;
}

const mockImages: ImageCardProps[] = [
  {
    id: "1",
    title: "Mathematical Formulas Chart",
    author: "Prof. Smith",
    likes: 1234,
    dislikes: 45,
    views: 15000,
    tags: ["Mathematics", "Formulas", "Education"],
    datePublished: "2024-01-15",
    subject: "Mathematics",
    quality: "4K",
    rating: 4.5,
    thumbnailUrl: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Science Lab Equipment Guide",
    author: "Dr. Johnson",
    likes: 892,
    dislikes: 23,
    views: 12000,
    tags: ["Science", "Laboratory", "Equipment"],
    datePublished: "2024-01-10",
    subject: "Science",
    quality: "1080p",
    rating: 4.8,
    thumbnailUrl: "/placeholder.svg",
  },
];

export function Claminges() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const genres = ["All", "Mathematics", "Science", "History", "Language", "Arts"];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">Claminges</h1>
        <p className="text-muted-foreground">Explore thousands of educational images</p>
      </div>

      {/* Genre Searcher */}
      <div className="flex gap-2 flex-wrap justify-center mb-4">
        {genres.map((genre) => (
          <Button
            key={genre}
            variant={selectedGenre === genre.toLowerCase() ? "default" : "outline"}
            onClick={() => setSelectedGenre(genre.toLowerCase())}
            size="sm"
          >
            {genre}
          </Button>
        ))}
      </div>

      {/* Search and Date Finder */}
      <div className="flex gap-2 items-center max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <DateFinderDialog onDateSelect={() => {}} />
        <Button
          variant="outline"
          onClick={() => setShowLeaderboard(!showLeaderboard)}
        >
          <Trophy className="h-4 w-4 mr-2" />
          Leaderboard
        </Button>
      </div>

      {/* Leaderboard */}
      {showLeaderboard && (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Top Most Viewed Images</h3>
            <div className="space-y-2">
              {mockImages
                .sort((a, b) => b.views - a.views)
                .map((image, index) => (
                  <div key={image.id} className="flex items-center gap-3 p-2 border rounded">
                    <Badge variant="secondary">#{index + 1}</Badge>
                    <span className="flex-1">{image.title}</span>
                    <span className="text-sm text-muted-foreground">{image.views.toLocaleString()} views</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockImages.map((image) => (
          <ImageCard key={image.id} {...image} />
        ))}
      </div>
    </div>
  );
}

function ImageCard(props: ImageCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const [dislikes, setDislikes] = useState(props.dislikes);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative group">
        <img
          src={props.thumbnailUrl}
          alt={props.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary">{props.quality}</Badge>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold line-clamp-2">{props.title}</h3>
          <p className="text-sm text-muted-foreground">by {props.author}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {props.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Subject: {props.subject}</span>
            <span>Rating: ⭐ {props.rating}</span>
          </div>
          <div>Published: {props.datePublished}</div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLikes(likes + 1)}
            className="flex items-center gap-1"
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="text-xs">{likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDislikes(dislikes + 1)}
            className="flex items-center gap-1"
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="text-xs">{dislikes}</span>
          </Button>
        </div>

        <Dialog open={showComments} onOpenChange={setShowComments}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              View Comments
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{props.title}</DialogTitle>
            </DialogHeader>
            <CommentsSection videoId={props.id} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
