'use client';

// external imports
import React, { useState } from 'react';
import {
    Container,
    Title,
    Card,
    Group,
    Text,
    Badge,
    Button,
    Select,
    Stack,
    Grid,
    Avatar,
    ThemeIcon
} from '@mantine/core';
import { IconUser, IconShoppingBag, IconRefresh, IconTrendingUp } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

// internal imports
import {
    mockUsers,
    mockProducts,
    updateProductStatus,
    updateUserStatus,
    updateUserBadgeLevel
} from '@/lib/mockData';
import { triggerEvent } from '@/actions/notifications';
import { User, Product } from '@/types';

const getStatusColor = (status: string) => {
    switch (status) {
        case 'approved':
        case 'live':
        case 'active':
            return 'green';
        case 'pending':
            return 'yellow';
        case 'sold':
            return 'blue';
        case 'inactive':
        case 'suspended':
            return 'red';
        default:
            return 'gray';
    }
};

const getBadgeColor = (level: string) => {
    switch (level) {
        case 'Elite':
            return 'violet';
        case 'Pro':
            return 'blue';
        case 'Expert':
            return 'orange';
        default:
            return 'gray';
    }
};

export default function StatusManagement() {
    const [users, setUsers] = useState(mockUsers);
    const [products, setProducts] = useState(mockProducts);

    const handleUserStatusChange = async (userId: string, newStatus: User['status']) => {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        const oldStatus = user.status;
        updateUserStatus(userId, newStatus);
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));

        await triggerEvent('status_updated', {
            type: 'User',
            id: userId,
            oldStatus,
            newStatus,
            userId
        });

        notifications.show({
            title: 'Status Updated',
            message: `${user.name}'s status changed to ${newStatus}`,
            color: 'green'
        });

        if (newStatus === 'approved' && user.type === 'seller') {
            await triggerEvent('seller_account_approved', { sellerId: userId });
        }
    };

    const handleUserBadgeChange = async (userId: string, newBadge: User['badgeLevel']) => {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        const oldBadge = user.badgeLevel;
        updateUserBadgeLevel(userId, newBadge);
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, badgeLevel: newBadge } : u));

        await triggerEvent('status_updated', {
            type: 'Badge Level',
            id: userId,
            oldStatus: oldBadge || 'Standard',
            newStatus: newBadge || 'Standard',
            userId
        });

        notifications.show({
            title: 'Badge Updated',
            message: `${user.name}'s badge level changed to ${newBadge}`,
            color: 'blue'
        });
    };

    const handleProductStatusChange = async (productId: string, newStatus: Product['status']) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const oldStatus = product.status;
        updateProductStatus(productId, newStatus);
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: newStatus } : p));

        await triggerEvent('status_updated', {
            type: 'Product',
            id: productId,
            oldStatus,
            newStatus,
            userId: product.sellerId
        });

        notifications.show({
            title: 'Product Status Updated',
            message: `${product.name} status changed to ${newStatus}`,
            color: 'green'
        });

        if (newStatus === 'live') {
            await triggerEvent('product_marked_live', {
                productId,
                sellerId: product.sellerId
            });
        }
    };

    const simulateRandomStatusChange = async () => {
        const randomChoice = Math.random();

        if (randomChoice < 0.5) {
            const pendingUsers = users.filter(u => u.status === 'pending');
            if (pendingUsers.length > 0) {
                const randomUser = pendingUsers[Math.floor(Math.random() * pendingUsers.length)];
                await handleUserStatusChange(randomUser.id, 'approved');
            }
        } else {
            const pendingProducts = products.filter(p => p.status === 'pending');
            if (pendingProducts.length > 0) {
                const randomProduct = pendingProducts[Math.floor(Math.random() * pendingProducts.length)];
                await handleProductStatusChange(randomProduct.id, 'live');
            }
        }
    };

    return (
        <Container size="full">
            <Stack gap="xl">
                <Group justify="space-between">
                    <Title order={1} c="var(--mantine-color-black-3)">Status Management</Title>
                    <Button
                        leftSection={<IconRefresh size={16} />}
                        onClick={simulateRandomStatusChange}
                        variant="light"
                    >
                        Simulate Random Update
                    </Button>
                </Group>

                <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Card withBorder h="100%">
                            <Group mb="md">
                                <ThemeIcon variant="light" color="blue">
                                    <IconUser size={20} />
                                </ThemeIcon>
                                <Title order={3}>Users</Title>
                            </Group>

                            <Stack gap="md">
                                {users.map((user) => (
                                    <Card key={user.id} withBorder p="sm">
                                        <Group justify="space-between" wrap="nowrap">
                                            <Group gap="sm">
                                                <Avatar size="sm" color="blue">
                                                    {user.name.charAt(0)}
                                                </Avatar>
                                                <div>
                                                    <Text size="sm" fw={500}>{user.name}</Text>
                                                    <Text size="xs" c="dimmed">{user.type}</Text>
                                                </div>
                                            </Group>

                                            <Group gap="xs">
                                                <Badge color={getStatusColor(user.status)} size="sm">
                                                    {user.status}
                                                </Badge>
                                                {user.badgeLevel && (
                                                    <Badge color={getBadgeColor(user.badgeLevel)} size="sm" variant="outline">
                                                        {user.badgeLevel}
                                                    </Badge>
                                                )}
                                            </Group>
                                        </Group>

                                        <Group mt="sm" gap="xs">
                                            <Select
                                                size="xs"
                                                placeholder="Status"
                                                data={[
                                                    { value: 'pending', label: 'Pending' },
                                                    { value: 'approved', label: 'Approved' },
                                                    { value: 'active', label: 'Active' },
                                                    { value: 'suspended', label: 'Suspended' }
                                                ]}
                                                value={user.status}
                                                onChange={(value) => value && handleUserStatusChange(user.id, value as User['status'])}
                                                w={120}
                                            />

                                            {user.type === 'seller' && (
                                                <Select
                                                    size="xs"
                                                    placeholder="Badge"
                                                    data={[
                                                        { value: 'Pro', label: 'Pro' },
                                                        { value: 'Elite', label: 'Elite' },
                                                        { value: 'Expert', label: 'Expert' }
                                                    ]}
                                                    value={user.badgeLevel || ''}
                                                    onChange={(value) => handleUserBadgeChange(user.id, value as User['badgeLevel'])}
                                                    w={100}
                                                />
                                            )}
                                        </Group>
                                    </Card>
                                ))}
                            </Stack>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Card withBorder h="100%">
                            <Group mb="md">
                                <ThemeIcon variant="light" color="green">
                                    <IconShoppingBag size={20} />
                                </ThemeIcon>
                                <Title order={3}>Products</Title>
                            </Group>

                            <Stack gap="md">
                                {products.map((product) => {
                                    const seller = users.find(u => u.id === product.sellerId);
                                    return (
                                        <Card key={product.id} withBorder p="sm">
                                            <Group justify="space-between" wrap="nowrap">
                                                <Stack gap={0} style={{ flex: 1 }}>
                                                    <Text size="sm" fw={500} truncate>{product.name}</Text>
                                                    <Text size="xs" c="dimmed">by {seller?.name}</Text>
                                                    <Text size="xs" c="dimmed">${product.price}</Text>
                                                </Stack>

                                                <Badge color={getStatusColor(product.status)} size="sm">
                                                    {product.status}
                                                </Badge>
                                            </Group>

                                            <Select
                                                size="xs"
                                                mt="sm"
                                                placeholder="Status"
                                                data={[
                                                    { value: 'pending', label: 'Pending' },
                                                    { value: 'live', label: 'Live' },
                                                    { value: 'sold', label: 'Sold' },
                                                    { value: 'inactive', label: 'Inactive' }
                                                ]}
                                                value={product.status}
                                                onChange={(value) => value && handleProductStatusChange(product.id, value as Product['status'])}
                                                w="100%"
                                            />
                                        </Card>
                                    );
                                })}
                            </Stack>
                        </Card>
                    </Grid.Col>
                </Grid>

                <Card withBorder>
                    <Group mb="md">
                        <ThemeIcon variant="light" color="violet">
                            <IconTrendingUp size={20} />
                        </ThemeIcon>
                        <Title order={3}>Event Simulation</Title>
                    </Group>

                    <Text size="sm" c="dimmed" mb="md">
                        Simulate various events to test the notification system
                    </Text>

                    <Group>
                        <Button
                            size="sm"
                            onClick={() => triggerEvent('new_listing_created', {
                                productId: 'prod-2',
                                sellerId: '4'
                            })}
                        >
                            New Listing
                        </Button>

                        <Button
                            size="sm"
                            onClick={() => triggerEvent('order_placed', {
                                orderId: 'order-2',
                                buyerId: '2',
                                sellerId: '1'
                            })}
                        >
                            Order Placed
                        </Button>

                        <Button
                            size="sm"
                            onClick={() => triggerEvent('return_request_initiated', {
                                returnId: 'return-1',
                                orderId: 'order-1',
                                buyerId: '2'
                            })}
                        >
                            Return Request
                        </Button>

                        <Button
                            size="sm"
                            onClick={() => triggerEvent('order_confirmed', {
                                orderId: 'order-2'
                            })}
                        >
                            Order Confirmed                        </Button>
                    </Group>
                </Card>
            </Stack>
        </Container>
    );
}
