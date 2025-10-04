import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HistoryDialog({ open, onOpenChange }: HistoryDialogProps) {
  const historyVideos = [
    { title: "Introduction to Calculus", date: "2025-10-03", views: 1, duration: "15:30" },
    { title: "World War 2 Overview", date: "2025-10-02", views: 2, duration: "22:15" },
    { title: "Biology Basics", date: "2025-10-01", views: 1, duration: "18:45" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Watch History
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {historyVideos.map((video, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{video.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {video.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        Watched {video.views}x
                      </div>
                      <Badge variant="secondary">{video.duration}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
