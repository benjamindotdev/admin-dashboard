'use client';

// external imports
import React from 'react';

// internal imports
import PageContainer from '@/components/layout/PageContainer';
import AdminCardSmall from '@/components/common/AdminCardSmall';
import AdminCardLarge from '@/components/common/AdminCardLarge';
import { mockOrders, mockUsers } from '@/lib/mockData';

export default function AdminOrders() {
    // Calculate metrics for the small cards
    const totalOrdersThisWeek = mockOrders.length; // Using all orders as mock data for "this week"
    const ordersOnHold = mockOrders.filter(order => order.status === 'on hold').length;
    const ordersRequiringAction = mockOrders.filter(order => order.status === 'on hold' || order.payoutStatus === 'pending').length;

    // Prepare orders data for the table
    const ordersData = mockOrders.map(order => {
        const buyer = mockUsers.find(user => user.id === order.buyerId);
        const seller = mockUsers.find(user => user.id === order.sellerId);

        return {
            'Order': '#' + order.orderNumber,
            'Item': order.item,
            'Buyer': buyer?.name || 'Unknown',
            'Seller': seller?.name || 'Unknown',
            'Date': new Date(order.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }),
            'Amount': `${order.currency} ${order.amount.toLocaleString()}`,
            'Status': order.status,
            'Payout Status': order.payoutStatus,
            'Actions': 'Actions',
        };
    });

    return (
        <PageContainer pageTitle='Orders'>
            <div className="flex flex-row gap-6 mb-6">
                <AdminCardSmall
                    title="Total Orders This Week"
                    value={totalOrdersThisWeek}
                    footer="16% vs last 7 days"
                    direction="up"
                />
                <AdminCardSmall
                    title="Orders On Hold"
                    value={ordersOnHold}
                    footer="30% vs last 7 days"
                    direction="down"
                />
                <AdminCardSmall
                    title="Orders Requiring Action"
                    value={ordersRequiringAction}
                    footer="25% vs last 7 days"
                    direction="down"
                />
            </div>
            <AdminCardLarge data={ordersData} />
        </PageContainer>
    );
}
