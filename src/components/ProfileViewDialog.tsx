import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Users, Calendar, Award } from "lucide-react";
import { useState } from "react";

interface ProfileViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelName: string;
  isVerified?: boolean;
  subscriberCount?: number;
  description?: string;
  awards?: string[];
  contentTypes?: string[];
  memberCount?: number;
}

export function ProfileViewDialog({
  open,
  onOpenChange,
  channelName,
  isVerified = false,
  subscriberCount = 1250,
  description = "Educational content creator focused on delivering high-quality learning experiences.",
  awards = ["Best Educational Creator 2024", "1M Subscribers", "Top Rated Teacher"],
  contentTypes = ["Videos", "Shorts", "Playlists", "Live", "Posts"],
  memberCount = 150,
}: ProfileViewDialogProps) {
  const [showAwards, setShowAwards] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {channelName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{channelName}</span>
                {isVerified && (
                  <CheckCircle2 className="h-6 w-6 text-blue-500 fill-blue-500" />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{subscriberCount.toLocaleString()} subscribers</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Channel Background */}
          <div className="w-full h-32 rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600" />

          {/* Description */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">About</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDescription(!showDescription)}
              >
                {showDescription ? "Hide" : "See Description"}
              </Button>
            </div>
            {showDescription && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </Card>

          {/* Awards */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Award className="h-5 w-5" />
                Awards
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAwards(!showAwards)}
              >
                {showAwards ? "Hide" : "See Awards"}
              </Button>
            </div>
            {showAwards && (
              <div className="space-y-2">
                {awards.map((award, index) => (
                  <Badge key={index} variant="secondary" className="mr-2">
                    {award}
                  </Badge>
                ))}
              </div>
            )}
          </Card>

          {/* Content Types */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Content Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {contentTypes.map((type, index) => (
                <Button key={index} variant="outline" size="sm">
                  {type}
                </Button>
              ))}
            </div>
          </Card>

          {/* Members Area */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Members ({memberCount})
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMembers(!showMembers)}
              >
                {showMembers ? "Hide" : "View Members"}
              </Button>
            </div>
            {showMembers && (
              <p className="text-sm text-muted-foreground">
                Join to access exclusive member content and perks!
              </p>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button className="flex-1">Subscribe</Button>
            <Button variant="outline">Join Channel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
