'use client';

// external imports
import React, { useState } from 'react';
import {
    Container,
    Title,
    Text,
    Grid,
    Card,
    Group,
    ThemeIcon,
    Stack,
    Button,
    Badge,
    Timeline,
    Progress
} from '@mantine/core';
import {
    IconBell,
    IconUsers,
    IconShoppingBag,
    IconTrendingUp,
    IconCheck,
    IconClock,
    IconAlertTriangle,
    IconSparkles
} from '@tabler/icons-react';

// internal imports
import { useNotifications } from '@/contexts/NotificationContext';
import { triggerEvent } from '@/actions/notifications';
import { mockUsers, mockProducts } from '@/lib/mockData';

export default function AdminDashboard() {
    const { notifications, unreadCount } = useNotifications();
    const [isSimulating, setIsSimulating] = useState(false);

    const stats = {
        totalUsers: mockUsers.length,
        activeUsers: mockUsers.filter(u => u.status === 'active' || u.status === 'approved').length,
        totalProducts: mockProducts.length,
        liveProducts: mockProducts.filter(p => p.status === 'live').length,
        totalNotifications: notifications.length,
        unreadNotifications: unreadCount
    };

    const runCompleteDemo = async () => {
        setIsSimulating(true);

        const events = [
            { event: 'new_listing_created', data: { productId: 'prod-2', sellerId: '4' }, delay: 1000 },
            { event: 'seller_account_approved', data: { sellerId: '5' }, delay: 2500 },
            { event: 'product_marked_live', data: { productId: 'prod-2', sellerId: '4' }, delay: 4000 },
            { event: 'order_placed', data: { orderId: 'order-2', buyerId: '2', sellerId: '1' }, delay: 5500 },
            { event: 'order_confirmed', data: { orderId: 'order-2' }, delay: 7000 },
            { event: 'return_request_initiated', data: { returnId: 'return-2', orderId: 'order-2', buyerId: '2' }, delay: 8500 },
            { event: 'return_accepted', data: { returnId: 'return-2', orderId: 'order-2' }, delay: 10000 }
        ];

        for (const { event, data, delay } of events) {
            setTimeout(async () => {
                await triggerEvent(event as 'new_listing_created' | 'seller_account_approved' | 'product_marked_live' | 'order_placed' | 'order_confirmed' | 'return_request_initiated' | 'return_accepted', data);
            }, delay);
        }

        setTimeout(() => setIsSimulating(false), 11000);
    };

    return (
        <Container size="full">
            <Stack gap="xl">
                <Group justify="space-between" align="center">

                    <Title order={1} c="var(--mantine-color-black-3)">Dashboard</Title>
                    <Button
                        size="lg"
                        leftSection={<IconSparkles size={20} />}
                        onClick={runCompleteDemo}
                        loading={isSimulating}
                        style={{ backgroundColor: 'var(--mantine-color-black-2)', color: 'white' }}
                    >
                        {isSimulating ? 'Running Demo...' : 'Run Complete Demo'}
                    </Button>
                </Group>

                <Grid>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <Card withBorder padding="lg">
                            <Group>
                                <ThemeIcon size="xl" variant="light" color="blue">
                                    <IconUsers size={28} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xl" fw={700}>{stats.totalUsers}</Text>
                                    <Text size="sm" c="dimmed">Total Users</Text>
                                    <Progress value={(stats.activeUsers / stats.totalUsers) * 100} size="xs" mt={4} />
                                    <Text size="xs" c="dimmed">{stats.activeUsers} active</Text>
                                </div>
                            </Group>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <Card withBorder padding="lg">
                            <Group>
                                <ThemeIcon size="xl" variant="light" color="green">
                                    <IconShoppingBag size={28} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xl" fw={700}>{stats.totalProducts}</Text>
                                    <Text size="sm" c="dimmed">Total Products</Text>
                                    <Progress value={(stats.liveProducts / stats.totalProducts) * 100} size="xs" mt={4} color="green" />
                                    <Text size="xs" c="dimmed">{stats.liveProducts} live</Text>
                                </div>
                            </Group>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <Card withBorder padding="lg">
                            <Group>
                                <ThemeIcon size="xl" variant="light" color="violet">
                                    <IconBell size={28} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xl" fw={700}>{stats.totalNotifications}</Text>
                                    <Text size="sm" c="dimmed">Notifications</Text>
                                    <Progress value={stats.unreadNotifications > 0 ? (stats.unreadNotifications / stats.totalNotifications) * 100 : 0} size="xs" mt={4} color="red" />
                                    <Text size="xs" c="dimmed">{stats.unreadNotifications} unread</Text>
                                </div>
                            </Group>
                        </Card>
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Card withBorder padding="lg" h="400">
                            <Group mb="md">
                                <ThemeIcon variant="light" color="blue">
                                    <IconTrendingUp size={20} />
                                </ThemeIcon>
                                <Title order={3}>Recent Activity</Title>
                            </Group>

                            <Timeline active={-1} bulletSize={24} lineWidth={2}>
                                {notifications.slice(0, 5).map((notification) => (
                                    <Timeline.Item
                                        key={notification.id}
                                        bullet={
                                            notification.type === 'success' ? <IconCheck size={14} /> :
                                                notification.type === 'warning' ? <IconAlertTriangle size={14} /> :
                                                    <IconClock size={14} />
                                        }
                                        title={notification.title}
                                        c={notification.isRead ? 'dimmed' : undefined}
                                    >
                                        <Text size="sm" c="dimmed" mt={4}>
                                            {notification.message}
                                        </Text>
                                        <Text size="xs" c="dimmed" mt={8}>
                                            {new Date(notification.createdAt).toLocaleTimeString()}
                                        </Text>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Card withBorder padding="lg" h="400">
                            <Group mb="md">
                                <ThemeIcon variant="light" color="green">
                                    <IconSparkles size={20} />
                                </ThemeIcon>
                                <Title order={3}>Quick Actions</Title>
                            </Group>

                            <Stack gap="sm">
                                <Button
                                    variant="light"
                                    fullWidth
                                    leftSection={<IconShoppingBag size={16} />}
                                    onClick={() => triggerEvent('new_listing_created', {
                                        productId: 'prod-2',
                                        sellerId: '4'
                                    })}
                                >
                                    Simulate New Listing
                                </Button>

                                <Button
                                    variant="light"
                                    fullWidth
                                    leftSection={<IconUsers size={16} />}
                                    onClick={() => triggerEvent('seller_account_approved', {
                                        sellerId: '5'
                                    })}
                                >
                                    Approve Seller
                                </Button>

                                <Button
                                    variant="light"
                                    fullWidth
                                    leftSection={<IconCheck size={16} />}
                                    onClick={() => triggerEvent('order_placed', {
                                        orderId: 'order-3',
                                        buyerId: '2',
                                        sellerId: '1'
                                    })}
                                >
                                    Place Order
                                </Button>

                                <Button
                                    variant="light"
                                    fullWidth
                                    leftSection={<IconAlertTriangle size={16} />}
                                    onClick={() => triggerEvent('return_request_initiated', {
                                        returnId: 'return-2',
                                        orderId: 'order-1',
                                        buyerId: '2'
                                    })}
                                >
                                    Return Request
                                </Button>
                            </Stack>

                        </Card>
                    </Grid.Col>
                </Grid>

                <Card withBorder padding="lg">
                    <Group mb="md">
                        <ThemeIcon variant="light" color="blue">
                            <IconBell size={20} />
                        </ThemeIcon>
                        <Title order={3}>System Status</Title>
                    </Group>

                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <Group>
                                <Badge color="green" variant="light">Active</Badge>
                                <Text size="sm">Notification Service</Text>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <Group>
                                <Badge color="green" variant="light">Connected</Badge>
                                <Text size="sm">Brevo Email API</Text>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <Group>
                                <Badge color="blue" variant="light">Real-time</Badge>
                                <Text size="sm">Frontend Updates</Text>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <Group>
                                <Badge color="violet" variant="light">Ready</Badge>
                                <Text size="sm">Event Processing</Text>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Card>
            </Stack>
        </Container>
    );
}
