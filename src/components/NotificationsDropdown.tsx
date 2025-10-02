import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  type: "upload" | "event" | "system";
  message: string;
  timestamp: Date;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "upload",
    message: "New video uploaded: Advanced Calculus",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    type: "event",
    message: "Live session starting in 30 minutes",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "3",
    type: "system",
    message: "Your subscription has been renewed",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

export function NotificationsDropdown() {
  const [notifications] = useState<Notification[]>(mockNotifications);

  const filterByTime = (timeframe: "recent" | "past" | "old") => {
    const now = Date.now();
    return notifications.filter((notif) => {
      const diff = now - notif.timestamp.getTime();
      const hours = diff / (1000 * 60 * 60);
      
      if (timeframe === "recent") return hours < 24;
      if (timeframe === "past") return hours >= 24 && hours < 168; // 1 week
      if (timeframe === "old") return hours >= 168;
      return true;
    });
  };

  const formatTimestamp = (date: Date) => {
    const now = Date.now();
    const diff = now - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="old">Old</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="max-h-[300px] overflow-y-auto">
            {filterByTime("recent").length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No recent notifications
              </div>
            ) : (
              filterByTime("recent").map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-3">
                  <div className="flex items-center gap-2 w-full">
                    <div className={`h-2 w-2 rounded-full ${
                      notif.type === "upload" ? "bg-blue-500" :
                      notif.type === "event" ? "bg-purple-500" :
                      "bg-green-500"
                    }`} />
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(notif.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{notif.message}</p>
                </DropdownMenuItem>
              ))
            )}
          </TabsContent>
          <TabsContent value="past" className="max-h-[300px] overflow-y-auto">
            {filterByTime("past").length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No past notifications
              </div>
            ) : (
              filterByTime("past").map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-3">
                  <div className="flex items-center gap-2 w-full">
                    <div className={`h-2 w-2 rounded-full ${
                      notif.type === "upload" ? "bg-blue-500" :
                      notif.type === "event" ? "bg-purple-500" :
                      "bg-green-500"
                    }`} />
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(notif.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{notif.message}</p>
                </DropdownMenuItem>
              ))
            )}
          </TabsContent>
          <TabsContent value="old" className="max-h-[300px] overflow-y-auto">
            {filterByTime("old").length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No old notifications
              </div>
            ) : (
              filterByTime("old").map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-3">
                  <div className="flex items-center gap-2 w-full">
                    <div className={`h-2 w-2 rounded-full ${
                      notif.type === "upload" ? "bg-blue-500" :
                      notif.type === "event" ? "bg-purple-500" :
                      "bg-green-500"
                    }`} />
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(notif.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{notif.message}</p>
                </DropdownMenuItem>
              ))
            )}
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
