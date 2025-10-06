import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Crown, Shield, GraduationCap, Coins, Clock, Beaker } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

const ownerTimers = [
  { duration: '5 minutes', price: 5000, icon: Clock },
  { duration: '10 minutes', price: 10000, icon: Clock },
  { duration: '20 minutes', price: 100000, icon: Clock },
  { duration: '50 minutes', price: 500000, icon: Clock },
  { duration: '100 minutes', price: 1000000, icon: Clock },
];

export function ShopDialog({ open, onOpenChange }: ShopDialogProps) {
  const [pesosoAmount, setPesosoAmount] = useState('');

  const handleBuyCurrency = () => {
    if (!pesosoAmount) {
      toast.error('Please enter an amount');
      return;
    }
    toast.success(`Purchased ${pesosoAmount} Pesoso worth of currency`);
    setPesosoAmount('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Clamatore - Shop
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="products" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="currency">Buy Currency</TabsTrigger>
            <TabsTrigger value="timers">Owner Timers</TabsTrigger>
            <TabsTrigger value="experimental">Experimental</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6 mt-4">
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
          </TabsContent>

          <TabsContent value="currency" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Coins className="h-5 w-5 text-primary" />
                  Buy Claions & Claints with Pesoso
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Purchase in-game currency using Pesoso (real money)
                </p>
                <div className="flex gap-2">
                  <Input 
                    type="number"
                    placeholder="Amount in Pesoso (₱)"
                    value={pesosoAmount}
                    onChange={(e) => setPesosoAmount(e.target.value)}
                  />
                  <Button onClick={handleBuyCurrency}>Buy Now</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Exchange Rate: ₱1 = 100 Claions or 1000 Claints
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timers" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <p className="text-sm text-muted-foreground">
                Purchase temporary owner role access for a limited time.
              </p>
              {ownerTimers.map((timer, index) => {
                const Icon = timer.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">Owner Role - {timer.duration}</p>
                        <p className="text-sm text-muted-foreground">{timer.price.toLocaleString()} Claints</p>
                      </div>
                    </div>
                    <Button size="sm">Purchase</Button>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="experimental" className="space-y-4 mt-4">
            <div className="p-6 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Beaker className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Experimental Features</p>
                    <p className="text-sm text-muted-foreground">
                      Unlock beta features and experimental tools
                    </p>
                    <p className="text-sm font-semibold text-amber-600 mt-1">
                      100 Claions + 20 Claints
                    </p>
                  </div>
                </div>
                <Button>Unlock</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}