
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, TrendingUp, Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'news' | 'market' | 'alert';
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearAll
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'news':
        return <Newspaper className="h-4 w-4 text-blue-500" />;
      case 'market':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'alert':
        return <Bell className="h-4 w-4 text-amber-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-4 top-16 z-50 w-80 bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <h3 className="font-medium">Notifications</h3>
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {notifications.filter(n => !n.read).length} new
                  </span>
                )}
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div>
              {notifications.length > 0 ? (
                <>
                  <ScrollArea className="h-80">
                    <div className="px-2">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-3 mb-1 rounded-md hover:bg-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}>
                          <div className="flex gap-3">
                            <div className="mt-0.5 flex-shrink-0">
                              {getIcon(notification.type)}
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${!notification.read ? 'text-blue-800' : ''}`}>
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-3 border-t bg-gray-50">
                    <div className="flex gap-2 justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={onMarkAllAsRead}
                      >
                        Mark all as read
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={onClearAll}
                      >
                        Clear all
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-12 px-4 text-center">
                  <Bell className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No notifications yet</p>
                  <p className="text-gray-400 text-xs mt-1">
                    We'll notify you about important updates and breaking news
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
