import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SettingsIcon, Moon, Sun, Monitor, Globe, Bell, Shield, 
  Palette, Database, Download, Trash2, RefreshCw
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { useTheme } from '@/components/ThemeProvider';
import SEOHead from '@/components/SEOHead';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    language: 'en',
    currency: 'USD',
    timezone: 'America/New_York',
    autoRefresh: true,
    soundEffects: false,
    animations: true,
    compactView: false,
    dataUsage: 'normal'
  });

  const [privacySettings, setPrivacySettings] = useState({
    analyticsTracking: true,
    marketingEmails: false,
    profileVisibility: 'private',
    activityLogging: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting updated",
      description: `${key} has been changed successfully.`,
      duration: 2000,
    });
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Privacy setting updated",
      description: `${key} has been updated.`,
      duration: 2000,
    });
  };

  const clearAllData = () => {
    toast({
      title: "Data cleared",
      description: "All local app data has been cleared.",
      variant: "destructive",
      duration: 3000,
    });
  };

  const exportData = () => {
    toast({
      title: "Export started",
      description: "Your data export will be ready shortly.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Settings - FinanceFlow"
        description="Customize your app preferences and settings"
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
            <div className="mb-8">
              <h1 className="text-responsive-xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">
                Customize your app experience and manage your preferences
              </p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="card-premium">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="h-5 w-5 mr-2" />
                        Localization
                      </CardTitle>
                      <CardDescription>
                        Configure language, currency, and regional settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Language</label>
                        <Select 
                          value={settings.language} 
                          onValueChange={(value) => handleSettingChange('language', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Currency</label>
                        <Select 
                          value={settings.currency} 
                          onValueChange={(value) => handleSettingChange('currency', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                            <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Timezone</label>
                        <Select 
                          value={settings.timezone} 
                          onValueChange={(value) => handleSettingChange('timezone', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">Eastern Time</SelectItem>
                            <SelectItem value="America/Chicago">Central Time</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                            <SelectItem value="Europe/London">GMT</SelectItem>
                            <SelectItem value="Europe/Paris">Central European Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-premium">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <RefreshCw className="h-5 w-5 mr-2" />
                        App Behavior
                      </CardTitle>
                      <CardDescription>
                        Control how the app behaves and updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Auto-refresh Data</h3>
                          <p className="text-sm text-muted-foreground">
                            Automatically update market data every 30 seconds
                          </p>
                        </div>
                        <Switch
                          checked={settings.autoRefresh}
                          onCheckedChange={(checked) => handleSettingChange('autoRefresh', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Sound Effects</h3>
                          <p className="text-sm text-muted-foreground">
                            Play sounds for notifications and alerts
                          </p>
                        </div>
                        <Switch
                          checked={settings.soundEffects}
                          onCheckedChange={(checked) => handleSettingChange('soundEffects', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Animations</h3>
                          <p className="text-sm text-muted-foreground">
                            Enable smooth transitions and animations
                          </p>
                        </div>
                        <Switch
                          checked={settings.animations}
                          onCheckedChange={(checked) => handleSettingChange('animations', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Compact View</h3>
                          <p className="text-sm text-muted-foreground">
                            Show more content in less space
                          </p>
                        </div>
                        <Switch
                          checked={settings.compactView}
                          onCheckedChange={(checked) => handleSettingChange('compactView', checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="h-5 w-5 mr-2" />
                      Theme & Display
                    </CardTitle>
                    <CardDescription>
                      Customize the look and feel of your app
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-3 block">Theme</label>
                      <div className="grid grid-cols-3 gap-4">
                        <button 
                          onClick={() => theme !== 'light' && toggleTheme()}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <Sun className="h-6 w-6 mx-auto mb-2" />
                          <div className="text-sm font-medium">Light</div>
                        </button>
                        <button 
                          onClick={() => theme !== 'dark' && toggleTheme()}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <Moon className="h-6 w-6 mx-auto mb-2" />
                          <div className="text-sm font-medium">Dark</div>
                        </button>
                        <button className="p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all">
                          <Monitor className="h-6 w-6 mx-auto mb-2" />
                          <div className="text-sm font-medium">System</div>
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Data Usage</label>
                      <Select 
                        value={settings.dataUsage} 
                        onValueChange={(value) => handleSettingChange('dataUsage', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minimal">Minimal - Save bandwidth</SelectItem>
                          <SelectItem value="normal">Normal - Balanced experience</SelectItem>
                          <SelectItem value="full">Full - Best quality</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Privacy & Security
                    </CardTitle>
                    <CardDescription>
                      Control how your data is used and shared
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Analytics Tracking</h3>
                        <p className="text-sm text-muted-foreground">
                          Help improve the app by sharing usage analytics
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.analyticsTracking}
                        onCheckedChange={(checked) => handlePrivacyChange('analyticsTracking', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Marketing Emails</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional content and product updates
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.marketingEmails}
                        onCheckedChange={(checked) => handlePrivacyChange('marketingEmails', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Activity Logging</h3>
                        <p className="text-sm text-muted-foreground">
                          Keep a log of your app activity for support purposes
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.activityLogging}
                        onCheckedChange={(checked) => handlePrivacyChange('activityLogging', checked)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Profile Visibility</label>
                      <Select 
                        value={privacySettings.profileVisibility} 
                        onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Anyone can see</SelectItem>
                          <SelectItem value="private">Private - Only you can see</SelectItem>
                          <SelectItem value="contacts">Contacts only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2" />
                      Data Management
                    </CardTitle>
                    <CardDescription>
                      Manage your stored data and account information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="justify-start h-auto p-4"
                        onClick={exportData}
                      >
                        <div className="flex items-start">
                          <Download className="h-5 w-5 mr-3 mt-0.5" />
                          <div className="text-left">
                            <div className="font-medium">Export Data</div>
                            <div className="text-sm text-muted-foreground">
                              Download your portfolio and settings
                            </div>
                          </div>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="justify-start h-auto p-4"
                        onClick={clearAllData}
                      >
                        <div className="flex items-start">
                          <Trash2 className="h-5 w-5 mr-3 mt-0.5 text-destructive" />
                          <div className="text-left">
                            <div className="font-medium">Clear Data</div>
                            <div className="text-sm text-muted-foreground">
                              Remove all local app data
                            </div>
                          </div>
                        </div>
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-4">Storage Usage</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Portfolio Data</span>
                          <Badge variant="secondary">2.4 MB</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">News Cache</span>
                          <Badge variant="secondary">15.8 MB</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Settings & Preferences</span>
                          <Badge variant="secondary">0.2 MB</Badge>
                        </div>
                        <div className="flex justify-between items-center font-medium">
                          <span className="text-sm">Total</span>
                          <Badge>18.4 MB</Badge>
                        </div>
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

export default Settings;