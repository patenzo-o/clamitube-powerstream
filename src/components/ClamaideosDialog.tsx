import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { PlayCircle, FastForward, Calendar as CalendarIcon, EyeOff, Flag, SkipForward } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ClamaideosDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClamaideosDialog({ open, onOpenChange }: ClamaideosDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const dailyVideos = [
    { date: "2025-10-04", title: "Introduction to Quantum Physics", thumbnail: "", claionsToSkip: 50 },
    { date: "2025-10-05", title: "World History: Ancient Rome", thumbnail: "", claionsToSkip: 50 },
    { date: "2025-10-06", title: "Mathematics: Calculus Basics", thumbnail: "", claionsToSkip: 50 },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5" />
            Clamaideos - Daily Videos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Watch daily educational videos! Select a day to see the video, or spend claions to skip ahead.
          </p>

          {/* Calendar */}
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>

          {/* Daily Videos List */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Upcoming Videos
            </h3>
            {dailyVideos.map((video, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Badge variant="outline">{video.date}</Badge>
                      <h4 className="font-medium">{video.title}</h4>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Watch
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast.success('Video hidden')}
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast.success('Video reported')}
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast.success('Skipped claint')}
                      >
                        <SkipForward className="h-4 w-4 mr-2" />
                        Skip
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}