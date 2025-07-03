'use client';

// external imports
import React, { useEffect, useState } from 'react';

// internal imports
import PageContainer from '@/components/layout/PageContainer';
import AdminCardSmall from '@/components/common/AdminCardSmall';
import DashboardBarChart from '@/components/dashboard/DashboardBarChart';
import DashboardPieChart from '@/components/dashboard/DashboardPieChart';
import AdminCardMedium from '@/components/common/AdminCardMedium';
import AdminCardLarge from '@/components/common/AdminCardLarge';
import { mockUsers, mockProducts, mockOrders, mockListings } from '@/lib/mockData';

import { useNotifications } from '@/contexts/NotificationContext';

type DashboardItem = {
    title: string;
    value: number;
    footer: string;
    direction: 'up' | 'down';
};

export default function AdminDashboard() {
    const [hasMarkedAsRead, setHasMarkedAsRead] = useState(false);
    const { markAllAsRead } = useNotifications();

    // Mark all unread notifications as read when dashboard is visited (only once)
    useEffect(() => {
        if (!hasMarkedAsRead) {
            markAllAsRead();
            setHasMarkedAsRead(true);
        }
    }, [markAllAsRead, hasMarkedAsRead]);

    const dashboardUpper: DashboardItem[] = [
        { title: 'Users for validation', value: mockUsers.filter(u => u.status === 'pending').length, footer: '16% vs last 7 days', direction: 'down' },
        { title: 'Listings Pending', value: mockListings.filter(p => p.authentication === 'pending').length, footer: '30% vs last 7 days', direction: 'down' },
        { title: 'Orders on hold', value: mockOrders.filter(o => o.status === 'on hold').length, footer: '25% vs last 7 days', direction: 'down' },
        {
            title: 'Returns This Month', value: mockOrders.filter(l => l.status === 'refunded').length, footer: '33% vs last 7 days', direction: 'down'
        },
        {
            title: 'Active Subscriptions', value: 2, footer: '50% vs last 7 days', direction: 'down'
        },
        {
            title: 'Gift Cards Issued', value: 4, footer: '45% vs last 7 days', direction: 'down'
        }
    ];

    // Get current month's actual data
    const currentMonthListings = mockListings.length;
    const currentMonthOrders = mockOrders.length;

    // Calculate sales by category
    const salesByCategory = mockOrders.reduce((acc, order) => {
        // Find the product for this order
        const product = mockProducts.find(p => p.name === order.item);
        if (product) {
            const category = product.category;
            acc[category] = (acc[category] || 0) + order.amount;
        }
        return acc;
    }, {} as Record<string, number>);

    // Calculate payout stats
    const totalRevenue = mockOrders.reduce((acc, order) => acc + order.amount, 0);
    const onHoldAmount = mockOrders
        .filter(order => order.status === 'on hold')
        .reduce((acc, order) => acc + order.amount, 0);

    // Prepare recent orders data for the table (last 5 orders)
    const recentOrdersData = mockOrders.slice(0, 5).map(order => ({
        'Order #': order.orderNumber,
        'Date': new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        'Item sold': order.item,
        'Buyer': mockUsers.find(user => user.id === order.buyerId)?.name || 'Unknown',
        'Amount': `MAD ${order.amount.toLocaleString()}`,
        'Status':
            order.status.charAt(0).toUpperCase() + order.status.slice(1)
    }))

    return (
        <PageContainer pageTitle='Dashboard'>
            <div className="flex flex-row gap-6 w-full">
                <div className='w-2/3'>
                    <div className='grid grid-cols-3 grid-rows-2 gap-6 mb-6'>
                        {
                            dashboardUpper.map((item, index) => (
                                <AdminCardSmall key={index} title={item.title} value={item.value} footer={item.footer} direction={item.direction} />
                            ))
                        }
                    </div>
                    <DashboardBarChart
                        currentMonthListings={currentMonthListings}
                        currentMonthOrders={currentMonthOrders}
                    />
                </div>
                <div className="flex flex-col gap-6 w-1/3 text-sm">
                    <AdminCardMedium title="Payout Stats">
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-gray-400'>Revenue</p>
                                <p className='font-bold'>MAD {totalRevenue.toLocaleString()}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-gray-400'>Bids on hold</p>
                                <p className='font-bold'>MAD {onHoldAmount.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-gray-400'>Money on escrow account</p>
                                <p className='font-bold'>MAD 1620</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-gray-400'>Commissions earned</p>
                                <p className='font-bold'>MAD {Math.round(totalRevenue * 0.1).toLocaleString()}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-gray-400'>Transactions completed</p>
                                <p className='font-bold'>MAD 5,200</p>
                            </div>
                        </div>
                    </AdminCardMedium>
                    <DashboardPieChart salesByCategory={salesByCategory} />
                </div>
            </div>
            <div className="mt-8">
                <AdminCardLarge title="Recent Transactions" data={recentOrdersData} />
            </div>
        </PageContainer>
    );
}
