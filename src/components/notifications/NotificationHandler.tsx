'use client';

// external imports
import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';

// internal imports
import { useNotifications } from '@/contexts/NotificationContext';

export const NotificationHandler: React.FC = () => {
    const { notifications: notificationList } = useNotifications();

    useEffect(() => {
        // Show the latest unread notification when notifications change
        const latestNotification = notificationList.find(n => !n.isRead);

        if (latestNotification) {
            // Check if this notification was just added (within the last 2 seconds)
            const isRecent = Date.now() - latestNotification.createdAt.getTime() < 2000;

            if (isRecent) {
                notifications.show({
                    title: latestNotification.title,
                    message: latestNotification.message,
                    color: latestNotification.type === 'success' ? 'green' :
                        latestNotification.type === 'warning' ? 'yellow' : 'blue',
                    autoClose: 5000,
                });
            }
        }
    }, [notificationList]);

    // This component doesn't render anything visible
    return null;
};
