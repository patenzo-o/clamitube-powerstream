import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Settings, Crown, Shield, User, GraduationCap, Moon, Sun, LogOut, UserCog, Languages, Users as UsersIcon, MessageCircle, RotateCw, Volume2, VolumeX, Coins } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const { profile, refreshProfile, signOut } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const updateProfile = async () => {
    if (!profile) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: displayName })
        .eq('user_id', profile.user_id);

      if (error) throw error;

      refreshProfile();
      toast({
        title: "Profile updated",
        description: "Your display name has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateEmail = async () => {
    if (!email) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) throw error;

      toast({
        title: "Email updated",
        description: "Check your new email for confirmation.",
      });
    } catch (error) {
      console.error('Error updating email:', error);
      toast({
        title: "Error",
        description: "Failed to update email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    if (!newPassword) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      setNewPassword("");
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Error",
        description: "Failed to update password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      onOpenChange(false);
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="h-4 w-4 text-amber-500" />;
      case 'admin': return <Shield className="h-4 w-4 text-purple-500" />;
      case 'teacher': return <GraduationCap className="h-4 w-4 text-blue-500" />;
      case 'student': return <User className="h-4 w-4 text-green-500" />;
      default: return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              Appearance
            </h3>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm">Dark Mode</span>
              </div>
              <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            </div>
          </div>

          <Separator />

          {/* Language Selector */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Languages className="h-4 w-4" />
              Language
            </h3>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-muted">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="en-UK">English (UK)</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
                <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                <SelectItem value="zh-TW">Chinese (Traditional)</SelectItem>
                <SelectItem value="hi">Indian</SelectItem>
                <SelectItem value="en-AU">Australian</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="el">Greek</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />
          {/* Account Management */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              Manage Account
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
              />
            </div>
            
            <Button onClick={updateProfile} disabled={loading} className="w-full">
              {loading ? "Updating..." : "Update Display Name"}
            </Button>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter new email"
              />
              <Button onClick={updateEmail} disabled={loading || !email} className="w-full" variant="outline">
                {loading ? "Updating..." : "Update Email"}
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <Button onClick={updatePassword} disabled={loading || !newPassword} className="w-full" variant="outline">
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Role & Currency Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Account Status</h3>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                {getRoleIcon(profile.role)}
                <span className="font-medium capitalize">{profile.role}</span>
              </div>
              <div className="text-sm text-muted-foreground">Current Role</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🪙</span>
                <span className="font-medium">{profile.claions.toLocaleString()}</span>
              </div>
              <div className="text-sm text-muted-foreground">Claions</div>
            </div>
          </div>

          <Separator />

          {/* Volume Control */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              Volume Control
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm w-12">{isMuted ? "Muted" : volume}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Additional Features */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Additional Features</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <UsersIcon className="h-4 w-4 mr-2" />
                Account Switcher
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Feedback
              </Button>
              <Button variant="outline" size="sm">
                <RotateCw className="h-4 w-4 mr-2" />
                Restart App
              </Button>
              <Button variant="outline" size="sm">
                <Coins className="h-4 w-4 mr-2" />
                Get 100 Free Claions
              </Button>
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={() => refreshProfile()}>
                Refresh Data
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
              <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};