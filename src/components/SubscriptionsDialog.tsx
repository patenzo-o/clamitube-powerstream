import { useState } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const subscriptions = [
  { id: "1", name: "Math Channel", subscribers: "10K" },
  { id: "2", name: "Science Hub", subscribers: "25K" },
  { id: "3", name: "History Today", subscribers: "15K" },
];

export function SubscriptionsDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Subscriptions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your Subscriptions</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {subscriptions.map((channel) => (
            <Card key={channel.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{channel.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{channel.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {channel.subscribers} subscribers
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Channel
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
