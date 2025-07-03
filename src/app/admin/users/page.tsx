'use client';

// external imports
import React from 'react';

// internal imports
import PageContainer from '@/components/layout/PageContainer';
import AdminCardLarge from '@/components/common/AdminCardLarge';
import { mockUsers } from '@/lib/mockData';

export default function AdminUsers() {
    // Prepare users data for the table
    const usersData = mockUsers.map(user => ({
        'ID': user.id,
        'Name': user.name,
        'Email': user.email,
        'Status': user.status,
        'User Type': user.type,
        'Date Joined': new Date(user.dateJoined).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }),
        'Actions': 'Actions',
    }));

    return (
        <PageContainer pageTitle='Users'>
            <AdminCardLarge title="Users" data={usersData} />
        </PageContainer>
    );
}
