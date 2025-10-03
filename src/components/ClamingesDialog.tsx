import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Image } from "lucide-react";
import { Claminges } from "./Claminges";

interface ClamingesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClamingesDialog({ open, onOpenChange }: ClamingesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Claminges - Educational Images
          </DialogTitle>
        </DialogHeader>
        <Claminges />
      </DialogContent>
    </Dialog>
  );
}
