import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, User, ThumbsUp, ThumbsDown, Bell, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoCardProps {
  title: string;
  author: string;
  dateCreated: string;
  views: number;
  tags: string[];
  thumbnail?: string;
  duration?: string;
  quality?: string;
  isNew?: boolean;
  likes?: number;
  dislikes?: number;
}

export function VideoCard({ 
  title, 
  author, 
  dateCreated, 
  views, 
  tags, 
  thumbnail,
  duration = "10:25",
  quality = "1080p",
  isNew = false,
  likes = 0,
  dislikes = 0
}: VideoCardProps) {
  const [showTags, setShowTags] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
    } else {
      setDisliked(true);
      setDislikeCount(dislikeCount + 1);
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    }
  };
  return (
    <Card className="group gradient-card border-0 shadow-card hover:shadow-hover transition-smooth cursor-pointer overflow-hidden">
      <div className="relative aspect-video bg-muted">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full gradient-hero flex items-center justify-center">
            <div className="text-6xl opacity-30">📚</div>
          </div>
        )}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <div className="bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
            {duration}
          </div>
          <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
            {quality}
          </div>
        </div>
        {isNew && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            NEW
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2 mb-2">
          {title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <User className="h-4 w-4" />
          <span>{author}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{dateCreated}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{views.toLocaleString()} views</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTags(true)}
            className="flex items-center gap-1"
          >
            <Tag className="h-3 w-3" />
            See Tags
          </Button>

          <Button
            variant={subscribed ? "default" : "outline"}
            size="sm"
            onClick={() => setSubscribed(!subscribed)}
            className="flex items-center gap-1"
          >
            <Bell className="h-3 w-3" />
            {subscribed ? "Subscribed" : "Subscribe"}
          </Button>

          <div className="flex items-center gap-1">
            <Button
              variant={liked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className="flex items-center gap-1"
            >
              <ThumbsUp className="h-3 w-3" />
              <span className="text-xs">{likeCount}</span>
            </Button>

            <Button
              variant={disliked ? "default" : "outline"}
              size="sm"
              onClick={handleDislike}
              className="flex items-center gap-1"
            >
              <ThumbsDown className="h-3 w-3" />
              <span className="text-xs">{dislikeCount}</span>
            </Button>
          </div>
        </div>

        <Dialog open={showTags} onOpenChange={setShowTags}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>All Tags</DialogTitle>
            </DialogHeader>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-sm bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}