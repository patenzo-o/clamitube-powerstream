import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, User } from "lucide-react";

interface VideoCardProps {
  title: string;
  author: string;
  dateCreated: string;
  views: number;
  tags: string[];
  thumbnail?: string;
  duration?: string;
}

export function VideoCard({ 
  title, 
  author, 
  dateCreated, 
  views, 
  tags, 
  thumbnail,
  duration = "10:25"
}: VideoCardProps) {
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
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
          {duration}
        </div>
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
        
        <div className="flex flex-wrap gap-1">
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
      </CardContent>
    </Card>
  );
}