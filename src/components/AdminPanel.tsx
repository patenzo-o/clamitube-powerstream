import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  Shield, 
  Crown, 
  Users, 
  Settings, 
  ShoppingBag, 
  GraduationCap, 
  UserCheck,
  Coins,
  Ban,
  DollarSign,
  Eye,
  MessageSquare
} from "lucide-react";

interface AdminPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string;
  role: string;
  claions: number;
}

export const AdminPanel = ({ open, onOpenChange }: AdminPanelProps) => {
  const { profile, isOwner } = useAuth();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({
    studentCanCreate: true,
    teacherCanCreate: true,
    adminCanCreate: true
  });

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (open) {
      fetchUsers();
    }
  }, [open]);

  const updateUserRole = async (userId: string, newRole: 'student' | 'teacher' | 'admin') => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Role updated",
        description: `User role has been updated to ${newRole}.`,
      });
      
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const purchaseRole = async (productName: 'DumaxiaPro' | 'Dumaxium') => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('purchase-role', {
        body: { productName }
      });

      if (error) throw error;

      toast({
        title: "Purchase successful!",
        description: data.message,
      });
      
      // Refresh user data
      window.location.reload();
    } catch (error: any) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase failed",
        description: error.message || "Failed to complete purchase.",
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
      case 'student': return <UserCheck className="h-4 w-4 text-green-500" />;
      default: return <Users className="h-4 w-4 text-gray-500" />;
    }
  };

  const canAccessOwnerControls = isOwner();
  const canPurchase = profile && profile.role !== 'owner';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Panel
            <Badge variant="outline" className="ml-2 capitalize">
              {profile?.role}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            {canAccessOwnerControls && <TabsTrigger value="owner-controls">Owner Controls</TabsTrigger>}
            {canPurchase && <TabsTrigger value="purchases">Purchases</TabsTrigger>}
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>
                  View and manage all users in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getRoleIcon(user.role)}
                        <div>
                          <p className="font-medium">{user.display_name || 'Unknown User'}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.claions.toLocaleString()} Claions
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                        
                        {canAccessOwnerControls && user.user_id !== profile?.user_id && (
                          <div className="flex gap-1">
                            {(['student', 'teacher', 'admin'] as const).map((role) => (
                              <Button
                                key={role}
                                size="sm"
                                variant={user.role === role ? "default" : "outline"}
                                onClick={() => updateUserRole(user.user_id, role)}
                                disabled={loading}
                                className="text-xs"
                              >
                                {role}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Owner Controls Tab */}
          {canAccessOwnerControls && (
            <TabsContent value="owner-controls" className="space-y-4">
              <div className="grid gap-4">
                {/* GSM - General Studential Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5" />
                      GSM - General Studential Management
                    </CardTitle>
                    <CardDescription>
                      Control who can create content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="student-create">Students can create content</Label>
                      <Switch
                        id="student-create"
                        checked={permissions.studentCanCreate}
                        onCheckedChange={(checked) => 
                          setPermissions(prev => ({ ...prev, studentCanCreate: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="teacher-create">Teachers can create content</Label>
                      <Switch
                        id="teacher-create"
                        checked={permissions.teacherCanCreate}
                        onCheckedChange={(checked) => 
                          setPermissions(prev => ({ ...prev, teacherCanCreate: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="admin-create">Admins can create content</Label>
                      <Switch
                        id="admin-create"
                        checked={permissions.adminCanCreate}
                        onCheckedChange={(checked) => 
                          setPermissions(prev => ({ ...prev, adminCanCreate: checked }))
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* GOM - General Ownership Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5" />
                      GOM - General Ownership Management
                    </CardTitle>
                    <CardDescription>
                      Manage user roles and permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Role management is available in the Users tab above.
                    </p>
                  </CardContent>
                </Card>

                {/* GLOM - General Lesson Ownership Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      GLOM - General Lesson Ownership Management
                    </CardTitle>
                    <CardDescription>
                      Transfer lessons and videos between users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Advanced lesson management tools coming soon.
                    </p>
                  </CardContent>
                </Card>

                {/* SAM - Student Account Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="h-5 w-5" />
                      SAM - Student Account Management
                    </CardTitle>
                    <CardDescription>
                      Give students claions and manage accounts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full">Give 100 Claions</Button>
                    <Button variant="outline" className="w-full">Give 1,000 Claions</Button>
                    <Button variant="outline" className="w-full">Give 1,000,000 Claions</Button>
                  </CardContent>
                </Card>

                {/* SOM - Student Ownership Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5" />
                      SOM - Student Ownership Management
                    </CardTitle>
                    <CardDescription>
                      Change student positions and roles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Use the Users tab to change roles.
                    </p>
                  </CardContent>
                </Card>

                {/* SPM - Student Permission Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      SPM - Student Permission Management
                    </CardTitle>
                    <CardDescription>
                      Restrict certain videos for students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Video restriction controls coming soon.
                    </p>
                  </CardContent>
                </Card>

                {/* Banner (Owner Only) */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ban className="h-5 w-5 text-red-600" />
                      Banner - User Banning
                    </CardTitle>
                    <CardDescription>
                      Ban users from the platform (Owner only)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Ban visitors, students, teachers, or admins permanently or temporarily.
                    </p>
                  </CardContent>
                </Card>

                {/* Purchasing Editor */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Purchasing Editor
                    </CardTitle>
                    <CardDescription>
                      Edit shop prices and products
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Manage shop items and pricing.
                    </p>
                  </CardContent>
                </Card>

                {/* Personal Viewer */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Personal Viewer
                    </CardTitle>
                    <CardDescription>
                      View user profiles (Owner only)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Access student, teacher, and admin profiles.
                    </p>
                  </CardContent>
                </Card>

                {/* Channel Banner */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ban className="h-5 w-5" />
                      Channel Banner
                    </CardTitle>
                    <CardDescription>
                      Ban channels from the app
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Remove inappropriate channels.
                    </p>
                  </CardContent>
                </Card>

                {/* Restriction Editor */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Restriction Editor
                    </CardTitle>
                    <CardDescription>
                      Set student actions over channels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Control student access to specific channels.
                    </p>
                  </CardContent>
                </Card>

                {/* Commenting Restrictions Editor */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Commenting Restrictions Editor
                    </CardTitle>
                    <CardDescription>
                      Restrict certain words from comments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Manage comment word filters.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Purchases Tab */}
          {canPurchase && (
            <TabsContent value="purchases" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5" />
                      Role Upgrades
                    </CardTitle>
                    <CardDescription>
                      Purchase role upgrades with Claions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Current Balance</h3>
                        <p className="text-2xl font-bold flex items-center gap-2">
                          <Coins className="h-5 w-5" />
                          {profile?.claions.toLocaleString()} Claions
                        </p>
                      </div>
                    </div>

                    {profile?.role !== 'admin' && profile?.role !== 'owner' && (
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">DumaxiaPro</h3>
                            <p className="text-sm text-muted-foreground">Upgrade to Admin role</p>
                            <p className="text-lg font-semibold text-purple-600">5,000 Claions</p>
                          </div>
                          <Button
                            onClick={() => purchaseRole('DumaxiaPro')}
                            disabled={loading || (profile?.claions || 0) < 5000}
                          >
                            {loading ? "Processing..." : "Purchase"}
                          </Button>
                        </div>
                      </div>
                    )}

                    {profile?.role !== 'owner' && (
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Dumaxium</h3>
                            <p className="text-sm text-muted-foreground">Upgrade to Owner role</p>
                            <p className="text-lg font-semibold text-amber-600">100,000 Claions</p>
                          </div>
                          <Button
                            onClick={() => purchaseRole('Dumaxium')}
                            disabled={loading || (profile?.claions || 0) < 100000}
                          >
                            {loading ? "Processing..." : "Purchase"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Panel Settings
                </CardTitle>
                <CardDescription>
                  Configure admin panel preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    onClick={fetchUsers} 
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? "Refreshing..." : "Refresh Data"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                    className="w-full"
                  >
                    Close Panel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};