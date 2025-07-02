'use client';

// external imports
import { Box, NavLink, Stack, Paper, Title } from '@mantine/core';
import { IconBell, IconDashboard, IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const pathname = usePathname();

    const sidebarItems = [
        { label: 'Dashboard', href: '/admin/dashboard', icon: IconDashboard },
        { label: 'Notifications', href: '/admin/notifications', icon: IconBell },
        { label: 'Status', href: '/admin/status', icon: IconSettings },
    ];

    return (
        <Box
            style={{
                display: 'flex',
                gap: '0px',
                minHeight: '100vh',
                backgroundColor: 'var(--mantine-color-white-0)',
            }}>
            <Stack p="md" w="300px">
                <Title order={3} mb="md" style={{ color: 'black' }} size={30}>
                    Admin
                </Title>
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <NavLink
                            key={item.href}
                            component={Link}
                            href={item.href}
                            label={item.label}
                            leftSection={<item.icon size="1rem" />}
                            active={isActive}
                            variant="filled"
                            styles={{
                                root: {
                                    width: '100%',
                                    color: isActive ? 'white' : 'var(--mantine-color-black-3)',
                                    backgroundColor: isActive ? 'var(--mantine-color-black-1)' : 'transparent',
                                    borderRadius: '4px',
                                    fontWeight: isActive ? 600 : 400,
                                    '&:hover': {
                                        backgroundColor: isActive
                                            ? 'var(--mantine-color-black-0)'
                                            : 'var(--mantine-color-gray-1)',
                                        color: isActive ? 'white' : 'var(--mantine-color-black-2)'
                                    }
                                },
                                label: {
                                    color: 'inherit'
                                }
                            }}
                        />
                    );
                })}
            </Stack>
            <Box
                style={{ flex: 1, backgroundColor: 'var(--mantine-color-white-0)' }}
                ml={{ base: 0 }}
            >
                <Paper
                    shadow="sm"
                    style={{
                        height: '60px',
                        borderBottom: '1px solid var(--mantine-color-gray-3)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 50,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 16px',
                    }}
                >
                    <Image
                        src="/trendies-logo.svg"
                        alt="Trendies Logo"
                        width={120}
                        height={40}
                    />
                </Paper>
                <Box p="md" style={{ backgroundColor: 'white', minHeight: 'calc(100vh - 60px)' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
