import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Crown, Shield, GraduationCap } from "lucide-react";

interface ShopDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const roleProducts = [
  {
    name: "Student Role",
    role: "student",
    cost: 100,
    icon: GraduationCap,
    description: "Access student features and content",
    color: "text-blue-500",
  },
  {
    name: "Teacher Role",
    role: "teacher",
    cost: 500,
    icon: Shield,
    description: "Create and upload educational content",
    color: "text-purple-500",
  },
  {
    name: "Admin Role",
    role: "admin",
    cost: 1000,
    icon: Crown,
    description: "Full administrative privileges",
    color: "text-amber-500",
  },
];

export function ShopDialog({ open, onOpenChange }: ShopDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Clamastream Shop
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Role Upgrades</h3>
            <div className="grid gap-4">
              {roleProducts.map((product) => {
                const Icon = product.icon;
                return (
                  <div
                    key={product.role}
                    className="border rounded-lg p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={`h-8 w-8 ${product.color}`} />
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {product.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-amber-700 bg-amber-100 dark:bg-amber-950">
                        {product.cost} ₡
                      </Badge>
                      <Button size="sm">Purchase</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
