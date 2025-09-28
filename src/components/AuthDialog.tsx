import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo } from "@/components/ui/logo";
import { Eye, EyeOff, Chrome, BookOpen, Zap, Figma, Code, Palette, Headphones } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignIn: (role: string) => void;
}

export function AuthDialog({ open, onOpenChange, onSignIn }: AuthDialogProps) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState("visitor");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeReady, setAgreeReady] = useState(false);

  const signInProviders = [
    { name: "Google", color: "bg-red-500 hover:bg-red-600", icon: Chrome },
    { name: "Learnful", color: "bg-blue-500 hover:bg-blue-600", icon: BookOpen },
    { name: "Bolt", color: "bg-yellow-500 hover:bg-yellow-600", icon: Zap },
    { name: "Figma", color: "bg-purple-500 hover:bg-purple-600", icon: Figma },
    { name: "Replit", color: "bg-green-500 hover:bg-green-600", icon: Code },
    { name: "Powerstream Studios", color: "bg-orange-500 hover:bg-orange-600", icon: Palette },
    { name: "Hendrix", color: "bg-indigo-500 hover:bg-indigo-600", icon: Headphones },
  ];

  const handleSubmit = () => {
    if (isSignUp && (!agreeTerms || !agreeReady)) return;
    onSignIn(selectedRole);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md gradient-card border-0 shadow-glow">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="sm" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            {isSignUp ? "Join Clamastream" : "Welcome Back"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* OAuth Providers */}
          <div className="grid grid-cols-2 gap-2">
            {signInProviders.map((provider) => {
              const IconComponent = provider.icon;
              return (
                <Button
                  key={provider.name}
                  variant="outline"
                  size="sm"
                  className={`${provider.color} text-white border-0 hover:shadow-hover transition-smooth flex items-center gap-2`}
                >
                  <IconComponent className="h-4 w-4" />
                  {provider.name}
                </Button>
              );
            })}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <div className="space-y-3">
            {isSignUp && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-muted/50 border-0"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/50 border-0"
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted/50 border-0 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <Label htmlFor="role">Choose Your Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="bg-muted/50 border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="visitor">Visitor</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher" className="border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20">
                      Teacher (Exclusive)
                    </SelectItem>
                    <SelectItem value="admin" className="border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20">
                      Admin (Exclusive)
                    </SelectItem>
                    <SelectItem value="owner" className="border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20">
                      Owner (Exclusive)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {isSignUp && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <span className="text-primary hover:underline cursor-pointer">
                      Terms and Conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-primary hover:underline cursor-pointer">
                      Privacy Policy
                    </span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ready" 
                    checked={agreeReady}
                    onCheckedChange={(checked) => setAgreeReady(checked as boolean)}
                  />
                  <Label htmlFor="ready" className="text-sm">
                    I agree, officially accept, now ready to become a{" "}
                    <span className="font-semibold text-primary capitalize">{selectedRole}</span>{" "}
                    in this app
                  </Label>
                </div>
              </div>
            )}

            <Button 
              onClick={handleSubmit}
              disabled={isSignUp && (!agreeTerms || !agreeReady)}
              className="w-full bg-primary hover:bg-primary/90 shadow-hover transition-bounce"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:underline font-medium"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}