import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VideoCard } from "./VideoCard";

export function ShortsButton() {
  const [open, setOpen] = useState(false);

  const shortsData = [
    {
      title: "Quick Math Tip",
      author: "Math Pro",
      dateCreated: "2024-01-15",
      views: 5000,
      tags: ["Math", "Tips"],
      duration: "0:45",
      quality: "1080p",
      isNew: true,
      likes: 234,
      dislikes: 5,
    },
    {
      title: "Science Fact",
      author: "Science Daily",
      dateCreated: "2024-01-14",
      views: 3200,
      tags: ["Science", "Facts"],
      duration: "0:30",
      quality: "720p",
      likes: 156,
      dislikes: 2,
    },
  ];

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <Play className="h-4 w-4" />
        Shorts
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Short Videos</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {shortsData.map((short, index) => (
              <VideoCard key={index} {...short} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
