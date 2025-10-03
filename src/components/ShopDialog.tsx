import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Crown, Shield, GraduationCap, Coins } from "lucide-react";

interface ShopDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const shopItems: ShopItem[] = [
  {
    id: "1",
    name: "Premium Badge",
    description: "Stand out with a premium badge on your profile",
    price: 500,
    category: "Cosmetics",
  },
  {
    id: "2",
    name: "Custom Theme",
    description: "Unlock exclusive color themes for your profile",
    price: 750,
    category: "Themes",
  },
  {
    id: "3",
    name: "Video Boost",
    description: "Boost your video visibility for 24 hours",
    price: 1000,
    category: "Promotion",
  },
  {
    id: "4",
    name: "Channel Banner",
    description: "Add a custom banner to your channel",
    price: 300,
    category: "Cosmetics",
  },
];

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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Clamatore - Shop
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* General Shop Items */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Shop Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shopItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{item.name}</span>
                      <Badge variant="secondary">{item.category}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                        <Coins className="h-4 w-4" />
                        <span>{item.price.toLocaleString()}</span>
                        <span className="text-xs">₡</span>
                      </div>
                      <Button size="sm">Purchase</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Role Upgrades */}
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
