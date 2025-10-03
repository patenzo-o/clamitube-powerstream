import { Header } from "@/components/Header";
import { ProfileAwards } from "@/components/ProfileAwards";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Calendar } from "lucide-react";

export default function Profile() {
  const { user, profile } = useAuth();
  
  // Mock subscriber count - in real app this would come from database
  const subscriberCount = 5500;

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">
                    {profile.display_name?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{profile.display_name}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {new Date(profile.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{subscriberCount.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">subscribers</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Awards Section */}
          <ProfileAwards subscriberCount={subscriberCount} />
        </div>
      </main>
    </div>
  );
}
