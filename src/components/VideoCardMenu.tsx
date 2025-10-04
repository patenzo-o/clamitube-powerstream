import { MoreVertical, Download, Clock, List, Flag, X, UserX, Share2, Ban, MessageSquare, Languages, Sparkles, Link, ToggleLeft, Send, TrendingUp, PlaySquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface VideoCardMenuProps {
  onDownload?: () => void;
  onQueue?: () => void;
  onWatchLater?: () => void;
  onAddToPlaylist?: () => void;
  onReport?: () => void;
  onNotInterested?: () => void;
  onDontRecommend?: () => void;
}

export function VideoCardMenu({
  onDownload,
  onQueue,
  onWatchLater,
  onAddToPlaylist,
  onReport,
  onNotInterested,
  onDontRecommend,
}: VideoCardMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 max-h-[500px] overflow-y-auto bg-background">
        <DropdownMenuItem onClick={onDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onQueue}>
          <List className="mr-2 h-4 w-4" />
          Add to queue
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onWatchLater}>
          <Clock className="mr-2 h-4 w-4" />
          Save to watch later
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onAddToPlaylist}>
          <PlaySquare className="mr-2 h-4 w-4" />
          Save to playlist
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="mr-2 h-4 w-4" />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <MoreVertical className="mr-2 h-4 w-4" />
          Auxiliary Options
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Send className="mr-2 h-4 w-4" />
          Send Feedback
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TrendingUp className="mr-2 h-4 w-4" />
          Open Advertisement Center
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          Hide Comments
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Languages className="mr-2 h-4 w-4" />
          Translate Comments
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Sparkles className="mr-2 h-4 w-4" />
          Ask Gemini
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ToggleLeft className="mr-2 h-4 w-4" />
          Autoplay: On
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onReport} className="text-red-600">
          <Flag className="mr-2 h-4 w-4" />
          Report
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Ban className="mr-2 h-4 w-4" />
          Block
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onNotInterested}>
          <X className="mr-2 h-4 w-4" />
          Not interested
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDontRecommend}>
          <UserX className="mr-2 h-4 w-4" />
          Don't recommend channel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
