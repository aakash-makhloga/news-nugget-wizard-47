import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Settings, Edit3, Camera, Mail, Phone, MapPin, 
  Calendar, Building, Globe, Save, Bell, Lock, Shield
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import SEOHead from '@/components/SEOHead';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    company: 'Tech Innovations Inc.',
    website: 'https://johndoe.com',
    bio: 'Passionate investor and financial enthusiast with over 5 years of experience in market analysis.',
    joinDate: '2023-01-15'
  });

  const [notifications, setNotifications] = useState({
    emailNews: true,
    emailAlerts: false,
    pushNotifications: true,
    weeklyDigest: true
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
      duration: 3000,
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved.",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Profile - FinanceFlow"
        description="Manage your profile settings and preferences"
      />
      <Header />
      
      <motion.main 
        className="flex-grow pt-20 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-responsive-xl font-bold mb-2">My Profile</h1>
                <p className="text-muted-foreground">
                  Manage your account settings and preferences
                </p>
              </div>
              <Button 
                variant={isEditing ? "default" : "outline"}
                onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                className="btn-glow"
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                {/* Profile Header */}
                <Card className="card-premium">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                          <AvatarFallback className="text-2xl">
                            {profileData.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button 
                            size="sm" 
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-semibold">{profileData.name}</h2>
                          <Badge variant="secondary" className="glass">
                            <User className="h-3 w-3 mr-1" />
                            Premium Member
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-1">{profileData.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Member since {new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Profile Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="card-premium">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                          className="focus-elegant"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          className="focus-elegant"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          className="focus-elegant"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                          disabled={!isEditing}
                          className="focus-elegant"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-premium">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building className="h-5 w-5 mr-2" />
                        Professional Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={profileData.company}
                          onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                          disabled={!isEditing}
                          className="focus-elegant"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                          disabled={!isEditing}
                          className="focus-elegant"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          disabled={!isEditing}
                          rows={4}
                          className="focus-elegant resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how you want to be notified about important updates and news.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email News Updates</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive daily financial news digest via email
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailNews}
                        onCheckedChange={(checked) => handleNotificationChange('emailNews', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Price Alerts</h3>
                        <p className="text-sm text-muted-foreground">
                          Get notified when your watchlist stocks hit target prices
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailAlerts}
                        onCheckedChange={(checked) => handleNotificationChange('emailAlerts', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Push Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Breaking financial news and market alerts
                        </p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Weekly Digest</h3>
                        <p className="text-sm text-muted-foreground">
                          Weekly summary of your portfolio performance
                        </p>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and privacy settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Enable Two-Factor Authentication
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Privacy Settings
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-4">Account Actions</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start text-muted-foreground">
                          Download Account Data
                        </Button>
                        <Button variant="destructive" className="w-full justify-start">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Profile;