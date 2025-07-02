'use client';

// external imports
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// internal imports
import { Notification } from '@/types';
import { mockNotifications, markNotificationAsRead } from '@/lib/mockData';
import { subscribeToNotifications } from '@/lib/notificationService';

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (notificationId: string) => void;
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
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

    useEffect(() => {
        // Subscribe to real-time notifications
        const unsubscribe = subscribeToNotifications((newNotification: Notification) => {
            setNotifications(prev => [newNotification, ...prev]);
        });

        return unsubscribe;
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
        getLatestNotifications,
        addNotification
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
