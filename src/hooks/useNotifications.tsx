
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'news' | 'market' | 'alert';
}

// Demo notifications
const demoNotifications: Notification[] = [
  {
    id: '1',
    title: 'Breaking News',
    message: 'Federal Reserve announces new interest rate decision',
    time: '10 minutes ago',
    read: false,
    type: 'news'
  },
  {
    id: '2',
    title: 'Market Alert',
    message: 'S&P 500 up 2% on positive economic data',
    time: '1 hour ago',
    read: false,
    type: 'market'
  },
  {
    id: '3',
    title: 'Stock Alert',
    message: 'Tesla (TSLA) announces strong quarterly results',
    time: '3 hours ago',
    read: true,
    type: 'alert'
  },
  {
    id: '4',
    title: 'Trending Story',
    message: 'New regulations proposed for cryptocurrency exchanges',
    time: 'Yesterday',
    read: true,
    type: 'news'
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  // Update unread count
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Toggle notification panel
  const toggleNotificationPanel = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      duration: 2000,
    });
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
      duration: 2000,
    });
  };

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      time: 'Just now',
      read: false,
      ...notification
    };
    
    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    
    toast({
      title: notification.title,
      description: notification.message,
      duration: 5000,
    });
  };

  return {
    notifications,
    unreadCount,
    isNotificationPanelOpen,
    toggleNotificationPanel,
    setIsNotificationPanelOpen,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    addNotification
  };
};
