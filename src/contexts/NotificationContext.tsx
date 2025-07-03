'use client';

// external imports
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// internal imports
import { Notification } from '@/types';
import { mockNotifications, markNotificationAsRead, notificationSimulator } from '@/lib/mockData';
import { subscribeToNotifications } from '@/lib/notificationService';

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (notificationId: string) => void;
    markAllAsRead: () => void;
    getLatestNotifications: (count: number) => Notification[];
    addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([...mockNotifications]);

    useEffect(() => {
        // Initial sync with mock notifications
        setNotifications([...mockNotifications]);

        // Start notification simulator
        if (!notificationSimulator.isActive()) {
            notificationSimulator.start();
        }

        // Subscribe to real-time notifications
        const unsubscribe = subscribeToNotifications((newNotification: Notification) => {
            setNotifications(prev => {
                // Check if notification already exists to avoid duplicates
                const exists = prev.some(n => n.id === newNotification.id);
                if (exists) return prev;
                return [newNotification, ...prev];
            });
        });

        // Subscribe to notification simulator data changes
        const unsubscribeSimulator = notificationSimulator.subscribe(() => {
            // Sync with mockNotifications when simulator generates new data
            setNotifications([...mockNotifications]);
        });

        // Sync with mockNotifications periodically (fallback)
        const syncInterval = setInterval(() => {
            setNotifications(prevNotifications => {
                // Check if mockNotifications has new items
                const newItems = mockNotifications.filter(mockNotif =>
                    !prevNotifications.some(prevNotif => prevNotif.id === mockNotif.id)
                );

                if (newItems.length > 0) {
                    return [...newItems, ...prevNotifications];
                }
                return prevNotifications;
            });
        }, 1000); // Check every second

        return () => {
            unsubscribe();
            unsubscribeSimulator();
            clearInterval(syncInterval);
            // Note: We don't stop the simulator here as it should run globally
        };
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const markAsRead = (notificationId: string) => {
        markNotificationAsRead(notificationId);
        setNotifications(prev =>
            prev.map(n =>
                n.id === notificationId ? { ...n, isRead: true } : n
            )
        );
    };

    const markAllAsRead = () => {
        // Mark all unread notifications as read
        const unreadNotifications = notifications.filter(n => !n.isRead);
        unreadNotifications.forEach(notification => {
            markNotificationAsRead(notification.id);
        });

        setNotifications(prev =>
            prev.map(n => ({ ...n, isRead: true }))
        );
    };

    const getLatestNotifications = (count: number) => {
        return notifications.slice(0, count);
    };

    const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
        const newNotification: Notification = {
            ...notification,
            id: `notif-${Date.now()}`,
            createdAt: new Date()
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const value: NotificationContextType = {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        getLatestNotifications,
        addNotification
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
