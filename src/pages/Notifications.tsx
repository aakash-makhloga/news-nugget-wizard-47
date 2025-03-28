
import React, { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Bell, Search, Check, X, Filter, AlertTriangle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Notifications = () => {
  const { notifications, markAllAsRead, markAsRead, clearAllNotifications } = useNotifications();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast({
      title: "All notifications marked as read",
      variant: "success",
      duration: 3000,
    });
  };

  const handleClearAll = () => {
    clearAllNotifications();
    toast({
      title: "All notifications cleared",
      variant: "default",
      duration: 3000,
    });
  };

  const getFilteredNotifications = () => {
    let filtered = [...notifications];
    
    // Apply tab filter
    if (selectedTab === 'unread') {
      filtered = filtered.filter(n => !n.read);
    }
    
    // Apply type filter
    if (selectedType) {
      filtered = filtered.filter(n => n.type === selectedType);
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        n => n.title.toLowerCase().includes(term) || n.message.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };

  const filteredNotifications = getFilteredNotifications();
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getEmptyStateMessage = () => {
    if (searchTerm) {
      return "No notifications match your search";
    }
    
    if (selectedType) {
      return `No ${selectedType} notifications found`;
    }
    
    if (selectedTab === 'unread') {
      return "No unread notifications";
    }
    
    return "No notifications yet";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <motion.main 
        className="flex-grow container pt-24 pb-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Notifications</h1>
            <p className="text-muted-foreground">
              {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
              {notifications.filter(n => !n.read).length > 0 && ` (${notifications.filter(n => !n.read).length} unread)`}
            </p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              Clear all
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-4 border-b">
                <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">
                      Unread
                      {notifications.filter(n => !n.read).length > 0 && (
                        <Badge className="ml-2 bg-blue-100 text-blue-800" variant="secondary">
                          {notifications.filter(n => !n.read).length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="p-4 border-b">
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search notifications..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedType || ''} onValueChange={(value) => setSelectedType(value || null)}>
                    <SelectTrigger className="w-[140px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>{selectedType || 'All types'}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All types</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="divide-y">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50 hover:bg-blue-50/70' : ''}`}
                    >
                      <div className="flex gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-sm">{notification.title}</h3>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">New</Badge>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(notification.time).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-muted-foreground">{getEmptyStateMessage()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h3 className="font-medium mb-3">Notification Settings</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Notification Preferences</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Choose what types of notifications you want to receive
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Manage preferences
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Email Notifications</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Set up email notifications for important updates
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Email settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Notifications;
