export interface User {
    id: string;
    name: string;
    email: string;
    type: 'seller' | 'buyer' | 'admin';
    status: 'pending' | 'approved' | 'active' | 'suspended';
    badgeLevel?: 'Pro' | 'Elite' | 'Expert';
}

export interface Product {
    id: string;
    name: string;
    sellerId: string;
    status: 'pending' | 'live' | 'sold' | 'inactive';
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Order {
    id: string;
    productId: string;
    buyerId: string;
    sellerId: string;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    amount: number;
    createdAt: Date;
}

export interface ReturnRequest {
    id: string;
    orderId: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    createdAt: Date;
}

export interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    userId?: string;
    isRead: boolean;
    createdAt: Date;
    metadata?: Record<string, unknown>;
}

export interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    htmlContent: string;
    variables: string[];
}

export type NotificationEvent =
    | 'new_listing_created'
    | 'seller_account_approved'
    | 'product_marked_live'
    | 'order_placed'
    | 'return_request_initiated'
    | 'order_confirmed'
    | 'return_accepted'
    | 'status_updated';

export interface EventData {
    event: NotificationEvent;
    userId?: string;
    data: Record<string, unknown>;
}
