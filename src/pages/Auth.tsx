import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Eye, EyeOff, Chrome, BookOpen, Zap, Figma, Code, Palette, Headphones } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("visitor");
  const [loading, setLoading] = useState(false);
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

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignUp = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms || !agreeReady) {
      toast({
        title: "Error",
        description: "Please accept the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            display_name: displayName || email.split('@')[0],
            role: role
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Account created!",
        description: "You can now sign in with your credentials.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-glow border-0">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="sm" />
          </div>
          <CardTitle>Welcome to Clamastream</CardTitle>
          <CardDescription>
            Educational video platform for students and teachers
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
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
                      <span className="text-xs">{provider.name}</span>
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
              
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pr-10"
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
              
              <Button onClick={handleSignIn} disabled={loading} className="w-full">
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
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
                      <span className="text-xs">{provider.name}</span>
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

              <div className="space-y-2">
                <Label htmlFor="signup-name">Display Name</Label>
                <Input
                  id="signup-name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="pr-10"
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
              
              <div className="space-y-2">
                <Label htmlFor="role">Choose Your Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="visitor">Visitor (Only Viewer Mode)</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher" className="bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 dark:from-amber-900/40 dark:via-yellow-900/40 dark:to-amber-900/40 border-2 border-amber-400 shadow-lg ring-2 ring-amber-300/50">
                      Teacher (Exclusive)
                    </SelectItem>
                    <SelectItem value="admin" className="bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 dark:from-amber-900/40 dark:via-yellow-900/40 dark:to-amber-900/40 border-2 border-amber-400 shadow-lg ring-2 ring-amber-300/50">
                      Admin (Exclusive)
                    </SelectItem>
                    <SelectItem value="owner" className="bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 dark:from-amber-900/40 dark:via-yellow-900/40 dark:to-amber-900/40 border-2 border-amber-400 shadow-lg ring-2 ring-amber-300/50">
                      Owner (Exclusive)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Terms and Conditions Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <span className="text-primary hover:underline cursor-pointer font-medium">
                      Terms and Conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-primary hover:underline cursor-pointer font-medium">
                      Privacy Policy
                    </span>{" "}
                    of this app
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="ready" 
                    checked={agreeReady}
                    onCheckedChange={(checked) => setAgreeReady(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="ready" className="text-sm leading-relaxed">
                    I agree, officially accept, now ready to become a{" "}
                    <span className="font-semibold text-primary capitalize">{role}</span>{" "}
                    in this app
                  </Label>
                </div>
              </div>
              
              <Button 
                onClick={handleSignUp} 
                disabled={loading || !agreeTerms || !agreeReady} 
                className="w-full bg-primary hover:bg-primary/90 shadow-hover transition-bounce"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}