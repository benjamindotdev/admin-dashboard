'use client'

import { useState, useRef, useEffect } from 'react'
import { IconHeart, IconMessageCircle, IconBell, IconUser, IconLogout, IconX } from '@tabler/icons-react';
import { useNotifications } from '@/contexts/NotificationContext';

export function Navbar() {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { unreadCount, markAsRead, getLatestNotifications } = useNotifications();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNotificationClick = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    const handleNotificationItemClick = (notificationId: string) => {
        markAsRead(notificationId);
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success': return '✅';
            case 'warning': return '⚠️';
            case 'error': return '❌';
            default: return 'ℹ️';
        }
    };

    const formatTimeAgo = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    const latestNotifications = getLatestNotifications(10);

    return (
        <div className="h-15 border-b border-gray-200 sticky top-0 z-50 flex items-center justify-between px-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-900">Admin</h3>
            <div className="flex items-center space-x-4">
                <IconHeart className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                <IconMessageCircle className="text-gray-600 hover:text-gray-800 cursor-pointer" />

                {/* Notification Bell with Dropdown */}
                <div className="relative">
                    <button
                        ref={buttonRef}
                        onClick={handleNotificationClick}
                        className="relative text-gray-600 hover:text-gray-800 cursor-pointer"
                    >
                        <IconBell />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full">
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {isNotificationOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                                <button
                                    onClick={() => setIsNotificationOpen(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <IconX size={20} />
                                </button>
                            </div>

                            <div className="max-h-80 overflow-y-auto">
                                {latestNotifications.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500">
                                        No notifications yet
                                    </div>
                                ) : (
                                    latestNotifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            onClick={() => handleNotificationItemClick(notification.id)}
                                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50' : ''
                                                }`}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <span className="text-lg">
                                                    {getNotificationIcon(notification.type)}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between">
                                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                                            {notification.title}
                                                        </h4>
                                                        {!notification.isRead && (
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1"></div>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-2">
                                                        {formatTimeAgo(notification.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {latestNotifications.length > 0 && (
                                <div className="p-3 border-t border-gray-200 bg-gray-50">
                                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium w-full text-center">
                                        View all notifications
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <IconUser className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                <IconLogout className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </div>
        </div>
    );
}