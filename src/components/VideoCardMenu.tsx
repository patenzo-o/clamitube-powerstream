import { MoreVertical, Download, Clock, List, Flag, X, UserX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
      <DropdownMenuContent align="end" className="w-56">
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
          <List className="mr-2 h-4 w-4" />
          Save to playlist
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onReport}>
          <Flag className="mr-2 h-4 w-4" />
          Report
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
