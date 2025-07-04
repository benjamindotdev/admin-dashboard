// external imports
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

// internal imports
import { NotificationProvider } from '@/contexts/NotificationContext';
import { NotificationHandler } from '@/components/notifications/NotificationHandler';
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});
export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Example project for Senior Dev role",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/x-icon" href="/next.svg" />
            </head>
            <body
                className={`${inter.variable} antialiased`}
            >
                <MantineProvider>
                    <NotificationProvider>
                        <Notifications />
                        <NotificationHandler />
                        {children}
                    </NotificationProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
