// external imports
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

// internal imports
import { NotificationProvider } from '@/contexts/NotificationContext';
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});
export const metadata: Metadata = {
    title: "Trendies",
    description: "Votre boutique de mode en ligne",
};

const theme = createTheme({
    fontFamily: 'var(--font-inter)',
    primaryColor: 'black',
    colors: {
        'black': ['#000000', '#1a1a1a', '#333333', '#4d4d4d', '#666666', '#808080', '#999999', '#b3b3b3', '#cccccc', '#e6e6e6'],
        'white': ['#ffffff', '#f2f2f2', '#e6e6e6', '#d9d9d9', '#cccccc', '#bfbfbf', '#b3b3b3', '#a6a6a6', '#999999', '#8c8c8c'],
    }
});

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
                <link rel="icon" type="image/x-icon" href="/trendies-logo.svg" />
            </head>
            <body
                className={`${inter.variable} antialiased`}
            >
                <MantineProvider theme={theme}>
                    <NotificationProvider>
                        <Notifications />
                        {children}
                    </NotificationProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
