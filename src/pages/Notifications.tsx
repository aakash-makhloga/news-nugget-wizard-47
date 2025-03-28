
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Info, AlertTriangle, Filter, Trash2 } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Notifications = () => {
  const { notifications, markAllAsRead, dismissNotification, clearAllNotifications } = useNotifications();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

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
      description: "Your notification history has been cleared.",
      variant: "default",
      duration: 3000,
    });
  };

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

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      default:
        return 'Info';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-display font-semibold mb-2">Notifications</h1>
                <p className="text-muted-foreground">
                  View and manage your notification history
                </p>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button variant="outline" onClick={handleMarkAllAsRead}>
                  Mark all as read
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setActiveTab('all')}>
                      All Notifications
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('unread')}>
                      Unread
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('info')}>
                      Information
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('success')}>
                      Success
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('warning')}>
                      Warnings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('error')}>
                      Errors
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="destructive" onClick={handleClearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8 grid grid-cols-3 md:grid-cols-6 gap-2">
                <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
                <TabsTrigger value="unread" className="text-sm">Unread</TabsTrigger>
                <TabsTrigger value="info" className="text-sm">Info</TabsTrigger>
                <TabsTrigger value="success" className="text-sm">Success</TabsTrigger>
                <TabsTrigger value="warning" className="text-sm">Warning</TabsTrigger>
                <TabsTrigger value="error" className="text-sm">Error</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                {filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Info className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No notifications found</h3>
                    <p className="text-muted-foreground max-w-md">
                      {activeTab === 'all' 
                        ? "You don't have any notifications yet. They will appear here when you receive them." 
                        : `You don't have any ${activeTab === 'unread' ? 'unread' : activeTab} notifications.`}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className={`overflow-hidden ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                          <CardContent className="p-0">
                            <div className="p-4 flex gap-3">
                              <div className="mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                  <h3 className="font-medium text-base">{notification.title}</h3>
                                  <div className="flex items-center">
                                    {!notification.read && (
                                      <Badge variant="secondary" className="mr-2 bg-blue-100 text-blue-800">
                                        New
                                      </Badge>
                                    )}
                                    <Badge variant="outline">
                                      {getNotificationTypeLabel(notification.type)}
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-muted-foreground mb-2">{notification.message}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(notification.timestamp).toLocaleString()}
                                  </span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-xs h-7"
                                    onClick={() => dismissNotification(notification.id)}
                                  >
                                    Dismiss
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Notifications;
