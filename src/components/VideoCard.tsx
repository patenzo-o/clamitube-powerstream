import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, User, ThumbsUp, ThumbsDown, Bell, Tag, CheckCircle2, MessageSquare, Award, Trophy, Users as UsersIcon, Heart, Share2, Signal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VideoCardMenu } from "./VideoCardMenu";
import { RatingSystem } from "./RatingSystem";
import { CommentsSection } from "./CommentsSection";
import { ProfileViewDialog } from "./ProfileViewDialog";

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
  isVerified?: boolean;
  isMembersOnly?: boolean;
  isSponsored?: boolean;
  hasYouTubeFeature?: boolean;
  videoId?: string;
  commentsCount?: number;
  ratingCount?: number;
  numericRating?: number;
  awards?: string[];
  leaderboardPosition?: number;
  difficulty?: "Easy" | "Medium" | "Difficult";
  topic?: string;
  isLivestreaming?: boolean;
  isFree?: boolean;
  loves?: number;
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
  dislikes = 0,
  isVerified = false,
  isMembersOnly = false,
  isSponsored = false,
  hasYouTubeFeature = false,
  videoId = "1",
  commentsCount = 0,
  ratingCount = 125,
  numericRating = 4.5,
  awards = [],
  leaderboardPosition,
  difficulty,
  topic,
  isLivestreaming = false,
  isFree = false,
  loves = 0,
}: VideoCardProps) {
  const [showTags, setShowTags] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const [showProfile, setShowProfile] = useState(false);
  const [showAwards, setShowAwards] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [loved, setLoved] = useState(false);
  const [loveCount, setLoveCount] = useState(loves);

  const handleLike = () => {
    if (isSponsored) return; // Ads can't be liked
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
    if (isSponsored) return; // Ads can't be disliked
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

  const handleSubscribe = () => {
    if (isSponsored) return; // Can't subscribe to ads
    setSubscribed(!subscribed);
  };
  
  const handleLove = () => {
    if (loved) {
      setLoved(false);
      setLoveCount(loveCount - 1);
    } else {
      setLoved(true);
      setLoveCount(loveCount + 1);
    }
  };
  
  const [showCaptions, setShowCaptions] = useState(false);

  return (
    <Card className="group gradient-card border-0 shadow-card hover:shadow-hover transition-smooth cursor-pointer overflow-hidden">
      <div 
        className="relative aspect-video bg-muted"
        onMouseEnter={() => setShowCaptions(true)}
        onMouseLeave={() => setShowCaptions(false)}
      >
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
        
        {/* Hover caption overlay */}
        {showCaptions && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/90 text-white px-3 py-2 text-sm">
            {title}
          </div>
        )}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <div className="bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
            {duration}
          </div>
          <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
            {quality}
          </div>
          {difficulty && (
            <div className={`text-white px-2 py-1 rounded text-sm font-medium ${
              difficulty === "Easy" ? "bg-green-600" : 
              difficulty === "Medium" ? "bg-yellow-600" : "bg-red-600"
            }`}>
              {difficulty}
            </div>
          )}
        </div>
        <div className="absolute top-2 left-2 flex gap-2 flex-wrap">
          {isLivestreaming && (
            <Badge className="bg-red-600 text-white px-3 py-1 text-xs font-bold animate-pulse border-0">
              🔴 LIVE
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-red-600 text-white px-3 py-1 text-xs font-bold animate-pulse border-0">
              NEW
            </Badge>
          )}
          {isSponsored && (
            <Badge className="bg-yellow-500 text-black px-3 py-1 text-xs font-bold border-0">
              SPONSORED
            </Badge>
          )}
          {isMembersOnly && (
            <Badge className="bg-purple-600 text-white px-3 py-1 text-xs font-bold border-0">
              MEMBERS ONLY
            </Badge>
          )}
          {hasYouTubeFeature && (
            <Badge className="bg-red-500 text-white px-3 py-1 text-xs font-bold border-0">
              YOUTUBE
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2 mb-2">
          {title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 p-0 h-auto hover:text-primary"
          >
            <User className="h-4 w-4" />
            <span>{author}</span>
            {isVerified && (
              <CheckCircle2 className="h-4 w-4 text-blue-500 fill-blue-500" />
            )}
          </Button>
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
          {isFree && (
            <Badge className="text-xs bg-green-500/20 text-green-700 border-green-500">
              FREE
            </Badge>
          )}
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <RatingSystem />
            <span className="text-sm text-muted-foreground">
              ({ratingCount} ratings)
            </span>
            <Badge variant="secondary">{numericRating}/5</Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTags(true)}
            className="flex items-center gap-1"
          >
            <Tag className="h-3 w-3" />
            See Tags
          </Button>

          {!isSponsored && (
            <Button
              variant={subscribed ? "default" : "outline"}
              size="sm"
              onClick={handleSubscribe}
              className="flex items-center gap-1"
              disabled={isSponsored}
            >
              <Bell className="h-3 w-3" />
              {subscribed ? "Subscribed" : "Subscribe"}
            </Button>
          )}

          {!isSponsored && (
            <>
              <div className="flex items-center gap-1">
                <Button
                  variant={liked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center gap-1"
                  disabled={isSponsored}
                >
                  <ThumbsUp className="h-3 w-3" />
                  <span className="text-xs">{likeCount}</span>
                </Button>

                <Button
                  variant={disliked ? "default" : "outline"}
                  size="sm"
                  onClick={handleDislike}
                  className="flex items-center gap-1"
                  disabled={isSponsored}
                >
                  <ThumbsDown className="h-3 w-3" />
                  <span className="text-xs">{dislikeCount}</span>
                </Button>
              </div>

              <div className="h-4 w-px bg-border" />

              <Button
                variant={loved ? "default" : "outline"}
                size="sm"
                onClick={handleLove}
                className={`flex items-center gap-1 ${loved ? 'text-red-500' : ''}`}
              >
                <Heart className={`h-3 w-3 ${loved ? 'fill-current' : ''}`} />
                <span className="text-xs">{loveCount}</span>
              </Button>
            </>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComments(true)}
            className="flex items-center gap-1"
          >
            <MessageSquare className="h-3 w-3" />
            <span className="text-xs">{commentsCount}</span>
          </Button>

          {awards && awards.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAwards(true)}
              className="flex items-center gap-1"
            >
              <Award className="h-3 w-3" />
              Awards
            </Button>
          )}

          {leaderboardPosition && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Trophy className="h-3 w-3" />
              #{leaderboardPosition}
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFriends(true)}
            className="flex items-center gap-1"
          >
            <UsersIcon className="h-3 w-3" />
            Friends
          </Button>

          {topic && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Tag className="h-3 w-3" />
              {topic}
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-pink-600"
          >
            <Heart className="h-3 w-3" />
            Super Thanks
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Share2 className="h-3 w-3" />
            Share
          </Button>

          <VideoCardMenu />
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

        <Dialog open={showComments} onOpenChange={setShowComments}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Comments</DialogTitle>
            </DialogHeader>
            <CommentsSection videoId={videoId} />
          </DialogContent>
        </Dialog>

        <ProfileViewDialog
          open={showProfile}
          onOpenChange={setShowProfile}
          channelName={author}
          isVerified={isVerified}
        />

        <Dialog open={showAwards} onOpenChange={setShowAwards}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Awards
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {awards?.map((award, index) => (
                <Badge key={index} variant="secondary" className="mr-2">
                  {award}
                </Badge>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showFriends} onOpenChange={setShowFriends}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Friends & Subscriptions
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              View channel subscriptions and collaborations
            </p>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}