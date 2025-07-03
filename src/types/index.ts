export interface User {
    id: string;
    name: string;
    email: string;
    type: 'seller' | 'buyer' | 'seller pro';
    status: 'pending' | 'active' | 'suspended';
    badgeLevel?: 'Pro' | 'Elite' | 'Expert';
    dateJoined: Date;
}

export interface Product {
    id: string;
    name: string;
    sellerId: string;
    category: 'bags' | 'shoes' | 'accessories';
    brand: string;
    price: number;
    currency: string;
    listedDate: Date;
    status: 'review in progress' | 'need more data' | 'returned' | 'processing' | 'live' | 'sold';
    createdAt: Date;
    updatedAt: Date;
}

export interface Order {
    id: string;
    orderNumber: string;
    item: string;
    buyerId: string;
    sellerId: string;
    date: Date;
    amount: number;
    currency: string;
    status: 'shipped' | 'on hold' | 'cancelled' | 'refunded';
    payoutStatus: 'paid' | 'processing' | 'pending';
}

export interface Listing {
    id: string;
    productId: string;
    product: string;
    sellerId: string;
    category: 'bags' | 'shoes' | 'accessories';
    brand: string;
    price: number;
    currency: string;
    dateListed: Date;
    authentication: 'pending' | 'verified';
    photoStatus: 'pending' | 'scheduled' | 'done';
    listingStatus: 'submitted' | 'authenticated' | 'photographed' | 'published';
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
