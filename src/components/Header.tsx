import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "./AuthDialog";
import { SettingsDialog } from "./SettingsDialog";
import { CreateContentDialog } from "./CreateContentDialog";
import { AdminPanel } from "./AdminPanel";
import { ShopDialog } from "./ShopDialog";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { SubscriptionsDialog } from "./SubscriptionsDialog";
import { ShortsButton } from "./ShortsButton";
import { Logo } from "./ui/logo";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Settings, Shield, LogOut, Crown, ShoppingCart, Coins } from "lucide-react";

export const Header = () => {
  const { user, profile, signOut, canCreateContent } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [createContentOpen, setCreateContentOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getRoleIcon = () => {
    switch (profile?.role) {
      case 'owner': return <Crown className="h-4 w-4 text-amber-500" />;
      case 'admin': return <Shield className="h-4 w-4 text-purple-500" />;
      default: return null;
    }
  };

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo size="sm" />
        
        <div className="flex items-center gap-2">
          {user && profile ? (
            <>
              {/* Create Content Button - Only for Owner, Teacher, Admin */}
              {canCreateContent() && (
                <Button
                  onClick={() => setCreateContentOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {profile.role}
                </Button>
              )}

              {/* Notifications Dropdown */}
              <NotificationsDropdown />

              {/* Subscriptions */}
              <SubscriptionsDialog />

              {/* Shorts */}
              <ShortsButton />

              {/* Shop Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShopOpen(true)}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Shop
              </Button>

              {/* Settings Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSettingsOpen(true)}
                className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                <Settings className="h-4 w-4" />
              </Button>

              {/* Admin Panel Button - All roles except Owner */}
              {profile.role !== 'owner' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAdminPanelOpen(true)}
                  className="flex items-center gap-2 bg-red-500 text-red-50 hover:bg-red-600 border-red-600"
                >
                  <Shield className="h-4 w-4" />
                  Admin Panel
                </Button>
              )}

              {/* Owner Controls - Only for Owner */}
              {profile.role === 'owner' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAdminPanelOpen(true)}
                  className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50"
                >
                  {getRoleIcon()}
                  Owner Controls
                </Button>
              )}

              {/* User Info & Sign Out */}
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{profile.display_name}</span>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800">
                  <Coins className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span className="font-semibold text-amber-900 dark:text-amber-100">{profile.claions.toLocaleString()}</span>
                  <span className="text-xs text-amber-700 dark:text-amber-300">₡</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button onClick={() => setAuthOpen(true)}>
              Sign In
            </Button>
          )}
        </div>
      </div>
      
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} onSignIn={() => {}} />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <CreateContentDialog open={createContentOpen} onOpenChange={setCreateContentOpen} />
      <AdminPanel open={adminPanelOpen} onOpenChange={setAdminPanelOpen} />
      <ShopDialog open={shopOpen} onOpenChange={setShopOpen} />
    </header>
  );
};