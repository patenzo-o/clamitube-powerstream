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
import { GenreSlider } from "./GenreSlider";
import { ClamingesDialog } from "./ClamingesDialog";
import { ClamaideosDialog } from "./ClamaideosDialog";
import { HistoryDialog } from "./HistoryDialog";
import { Logo } from "./ui/logo";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Settings, Shield, LogOut, Crown, ShoppingCart, Coins, Image, User, Clock as ClockIcon, History, Info, FileText, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, profile, signOut, canCreateContent } = useAuth();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [createContentOpen, setCreateContentOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [clamingesOpen, setClamingesOpen] = useState(false);
  const [clamaideosOpen, setClamaideosOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

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
    <>
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
        <Logo size="sm" />
        
        <div className="flex items-center gap-1">
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

              {/* Shop Button - Clamatore */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShopOpen(true)}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Clamatore
              </Button>

              {/* Claminges Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setClamingesOpen(true)}
                className="flex items-center gap-2"
              >
                <Image className="h-4 w-4" />
                Claminges
              </Button>

              {/* Settings Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSettingsOpen(true)}
                className="h-8 w-8 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
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

              {/* Additional Buttons */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setClamaideosOpen(true)}
                className="h-8 w-8"
              >
                <ClockIcon className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setHistoryOpen(true)}
                className="h-8 w-8"
              >
                <History className="h-4 w-4" />
              </Button>

              {/* User Info & Sign Out */}
              <div className="flex items-center gap-2 text-sm relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/profile")}
                  onMouseEnter={() => setShowCloseButton(true)}
                  onMouseLeave={() => setShowCloseButton(false)}
                  className="flex items-center gap-2 relative"
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">{profile.display_name}</span>
                  {showCloseButton && (
                    <X className="h-3 w-3 absolute -top-1 -right-1 bg-background rounded-full" />
                  )}
                </Button>
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
        <ClamingesDialog open={clamingesOpen} onOpenChange={setClamingesOpen} />
        <ClamaideosDialog open={clamaideosOpen} onOpenChange={setClamaideosOpen} />
        <HistoryDialog open={historyOpen} onOpenChange={setHistoryOpen} />
      </header>
      <GenreSlider />
      
      {/* Time and Date Clock */}
      <div className="w-full border-b bg-background/95 backdrop-blur py-2">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>{new Date().toLocaleDateString()}</span>
            <span>{new Date().toLocaleTimeString()}</span>
            <span>🇵🇭 Philippines</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Info className="h-4 w-4 mr-2" />
              About
            </Button>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Terms of Service
            </Button>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Privacy Policy
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};