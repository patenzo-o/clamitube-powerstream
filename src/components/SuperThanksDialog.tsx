import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, DollarSign } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SuperThanksDialogProps {
  channelName: string;
}

const superThanksAmounts = [50, 100, 200, 500, 1000, 2000];

export function SuperThanksDialog({ channelName }: SuperThanksDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleSend = () => {
    if (!selectedAmount) {
      toast.error("Please select an amount");
      return;
    }
    toast.success(`₱${selectedAmount} Super Thanks sent to ${channelName}!`);
    setOpen(false);
    setSelectedAmount(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <div className="relative">
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <DollarSign className="h-2 w-2 absolute top-0 right-0 text-yellow-500" />
          </div>
          Super Thanks
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            Send Super Thanks to {channelName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Show your appreciation with a Super Thanks! Your contribution helps creators continue making great educational content.
          </p>
          
          <div className="grid grid-cols-3 gap-3">
            {superThanksAmounts.map((amount) => (
              <Card
                key={amount}
                className={`cursor-pointer transition-all ${
                  selectedAmount === amount 
                    ? 'ring-2 ring-primary bg-primary/10' 
                    : 'hover:bg-accent'
                }`}
                onClick={() => setSelectedAmount(amount)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">₱{amount}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {selectedAmount && `You selected: ₱${selectedAmount}`}
            </div>
            <Button onClick={handleSend} disabled={!selectedAmount}>
              Send Super Thanks
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
