import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Settings, Crown, Shield, User, GraduationCap } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const { profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [loading, setLoading] = useState(false);

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Profile Information</h3>
            
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
              {loading ? "Updating..." : "Update Profile"}
            </Button>
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

          {/* Quick Actions */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => refreshProfile()}>
                Refresh Data
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