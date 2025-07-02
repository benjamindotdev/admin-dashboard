'use client';

// external imports
import React, { useState, useMemo } from 'react';
import {
    Container,
    Title,
    Table,
    Badge,
    Text,
    Group,
    Select,
    TextInput,
    Button,
    Stack,
    Card,
    ThemeIcon,
    Grid,
    Pagination
} from '@mantine/core';
import { IconSearch, IconFilter, IconBell, IconUsers, IconCheck, IconClock } from '@tabler/icons-react';
import dayjs from 'dayjs';

// internal imports
import { useNotifications } from '@/contexts/NotificationContext';
import { Notification } from '@/types';

const ITEMS_PER_PAGE = 10;

const getNotificationTypeColor = (type: Notification['type']) => {
    switch (type) {
        case 'success':
            return 'green';
        case 'warning':
            return 'yellow';
        case 'error':
            return 'red';
        case 'info':
        default:
            return 'blue';
    }
};

export default function AdminNotificationLogs() {
    const { notifications } = useNotifications();
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<string | null>('all');
    const [statusFilter, setStatusFilter] = useState<string | null>('all');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredNotifications = useMemo(() => {
        return notifications.filter(notification => {
            const matchesSearch =
                notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notification.message.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = typeFilter === 'all' || notification.type === typeFilter;
            const matchesStatus = statusFilter === 'all' ||
                (statusFilter === 'read' && notification.isRead) ||
                (statusFilter === 'unread' && !notification.isRead);

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [notifications, searchTerm, typeFilter, statusFilter]);

    const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
    const paginatedNotifications = filteredNotifications.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const stats = useMemo(() => {
        const total = notifications.length;
        const unread = notifications.filter(n => !n.isRead).length;
        const byType = notifications.reduce((acc, notification) => {
            acc[notification.type] = (acc[notification.type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return { total, unread, byType };
    }, [notifications]);

    const resetFilters = () => {
        setSearchTerm('');
        setTypeFilter('all');
        setStatusFilter('all');
        setCurrentPage(1);
    };

    return (
        <Container size="full">
            <Stack gap="xl">
                <Group justify="space-between">
                    <Title order={1} c="var(--mantine-color-black-3)">Notification Logs</Title>
                    <Button variant="light" leftSection={<IconFilter size={16} />} onClick={resetFilters}>
                        Reset Filters
                    </Button>
                </Group>

                <Grid>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Card withBorder>
                            <Group>
                                <ThemeIcon size="lg" variant="light" color="blue">
                                    <IconBell size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xl" fw={700}>{stats.total}</Text>
                                    <Text size="sm" c="dimmed">Total Notifications</Text>
                                </div>
                            </Group>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Card withBorder>
                            <Group>
                                <ThemeIcon size="lg" variant="light" color="red">
                                    <IconClock size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xl" fw={700}>{stats.unread}</Text>
                                    <Text size="sm" c="dimmed">Unread</Text>
                                </div>
                            </Group>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Card withBorder>
                            <Group>
                                <ThemeIcon size="lg" variant="light" color="green">
                                    <IconCheck size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xl" fw={700}>{stats.total - stats.unread}</Text>
                                    <Text size="sm" c="dimmed">Read</Text>
                                </div>
                            </Group>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Card withBorder>
                            <Group>
                                <ThemeIcon size="lg" variant="light" color="violet">
                                    <IconUsers size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xl" fw={700}>{Object.keys(stats.byType).length}</Text>
                                    <Text size="sm" c="dimmed">Types</Text>
                                </div>
                            </Group>
                        </Card>
                    </Grid.Col>
                </Grid>

                <Card withBorder p="md">
                    <Group>
                        <TextInput
                            placeholder="Search notifications..."
                            leftSection={<IconSearch size={16} />}
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.currentTarget.value)}
                            style={{ flex: 1 }}
                        />
                        <Select
                            placeholder="Filter by type"
                            data={[
                                { value: 'all', label: 'All Types' },
                                { value: 'success', label: 'Success' },
                                { value: 'info', label: 'Info' },
                                { value: 'warning', label: 'Warning' },
                                { value: 'error', label: 'Error' }
                            ]}
                            value={typeFilter}
                            onChange={setTypeFilter}
                            w={150}
                        />
                        <Select
                            placeholder="Filter by status"
                            data={[
                                { value: 'all', label: 'All Status' },
                                { value: 'read', label: 'Read' },
                                { value: 'unread', label: 'Unread' }
                            ]}
                            value={statusFilter}
                            onChange={setStatusFilter}
                            w={150}
                        />
                    </Group>
                </Card>

                <Card withBorder>
                    <Table.ScrollContainer minWidth={800}>
                        <Table striped highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Type</Table.Th>
                                    <Table.Th>Title</Table.Th>
                                    <Table.Th>Message</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                    <Table.Th>User ID</Table.Th>
                                    <Table.Th>Created At</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {paginatedNotifications.map((notification) => (
                                    <Table.Tr key={notification.id}>
                                        <Table.Td>
                                            <Badge
                                                variant="light"
                                                color={getNotificationTypeColor(notification.type)}
                                                size="sm"
                                            >
                                                {notification.type}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text fw={notification.isRead ? 400 : 600}>
                                                {notification.title}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed" truncate style={{ maxWidth: 300 }}>
                                                {notification.message}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge
                                                variant="light"
                                                color={notification.isRead ? 'gray' : 'blue'}
                                                size="sm"
                                            >
                                                {notification.isRead ? 'Read' : 'Unread'}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed">
                                                {notification.userId || 'System'}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm">
                                                {dayjs(notification.createdAt).format('MMM DD, YYYY HH:mm')}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>

                    {totalPages > 1 && (
                        <Group justify="center" mt="md">
                            <Pagination
                                value={currentPage}
                                onChange={setCurrentPage}
                                total={totalPages}
                                size="sm"
                            />
                        </Group>
                    )}

                    {filteredNotifications.length === 0 && (
                        <Text ta="center" c="dimmed" py="xl">
                            No notifications found matching your criteria.
                        </Text>
                    )}
                </Card>

                <Text size="sm" c="dimmed">
                    Showing {paginatedNotifications.length} of {filteredNotifications.length} notifications
                    {filteredNotifications.length !== notifications.length && ` (filtered from ${notifications.length} total)`}
                </Text>
            </Stack>
        </Container>
    );
}
