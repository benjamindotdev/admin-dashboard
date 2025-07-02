// internal imports
import { User, Product, Order, Notification, EmailTemplate, ReturnRequest } from '@/types';

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'John Seller',
        email: 'hello@benjamin.dev',
        type: 'seller',
        status: 'approved',
        badgeLevel: 'Pro'
    },
    {
        id: '2',
        name: 'Jane Buyer',
        email: 'hello@benjamin.dev',
        type: 'buyer',
        status: 'active'
    },
    {
        id: '3',
        name: 'Mike Admin',
        email: 'hello@benjamin.dev',
        type: 'admin',
        status: 'active'
    },
    {
        id: '4',
        name: 'Sarah Elite',
        email: 'hello@benjamin.dev',
        type: 'seller',
        status: 'approved',
        badgeLevel: 'Elite'
    },
    {
        id: '5',
        name: 'Tom Pending',
        email: 'hello@benjamin.dev',
        type: 'seller',
        status: 'pending'
    }
];

export const mockProducts: Product[] = [
    {
        id: 'prod-1',
        name: 'Vintage Leather Jacket',
        sellerId: '1',
        status: 'live',
        price: 299.99,
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date('2024-12-01')
    },
    {
        id: 'prod-2',
        name: 'Designer Sneakers',
        sellerId: '4',
        status: 'pending',
        price: 199.99,
        createdAt: new Date('2024-12-15'),
        updatedAt: new Date('2024-12-15')
    },
    {
        id: 'prod-3',
        name: 'Silk Scarf',
        sellerId: '1',
        status: 'sold',
        price: 89.99,
        createdAt: new Date('2024-11-20'),
        updatedAt: new Date('2024-12-10')
    }
];

export const mockOrders: Order[] = [
    {
        id: 'order-1',
        productId: 'prod-3',
        buyerId: '2',
        sellerId: '1',
        status: 'delivered',
        amount: 89.99,
        createdAt: new Date('2024-12-10')
    },
    {
        id: 'order-2',
        productId: 'prod-1',
        buyerId: '2',
        sellerId: '1',
        status: 'pending',
        amount: 299.99,
        createdAt: new Date('2024-12-20')
    }
];

export const mockReturnRequests: ReturnRequest[] = [
    {
        id: 'return-1',
        orderId: 'order-1',
        reason: 'Item not as described',
        status: 'pending',
        createdAt: new Date('2024-12-21')
    }
];

export const mockEmailTemplates: EmailTemplate[] = [
    {
        id: 'seller-approval',
        name: 'Seller Account Approved',
        subject: 'Welcome to Trendies! Your seller account has been approved',
        htmlContent: `
      <h1>Congratulations, \{\{sellerName\}\}!</h1>
      <p>Your seller account has been approved. You can now start listing your items.</p>
      <p>Your current badge level: \{\{badgeLevel\}\}</p>
      <a href="\{\{dashboardUrl\}\}">Go to Dashboard</a>
    `,
        variables: ['sellerName', 'badgeLevel', 'dashboardUrl']
    },
    {
        id: 'order-confirmation',
        name: 'Order Confirmation',
        subject: 'Order Confirmed - \{\{productName\}\}',
        htmlContent: `
      <h1>Order Confirmed!</h1>
      <p>Hi \{\{buyerName\}\},</p>
      <p>Your order for <strong>\{\{productName\}\}</strong> has been confirmed.</p>
      <p>Order ID: \{\{orderId\}\}</p>
      <p>Amount: $\{\{amount\}\}</p>
      <p>Seller: \{\{sellerName\}\}</p>
    `,
        variables: ['buyerName', 'productName', 'orderId', 'amount', 'sellerName']
    },
    {
        id: 'return-accepted',
        name: 'Return Request Accepted',
        subject: 'Return Request Approved - \{\{productName\}\}',
        htmlContent: `
      <h1>Return Request Approved</h1>
      <p>Hi \{\{buyerName\}\},</p>
      <p>Your return request for <strong>\{\{productName\}\}</strong> has been approved.</p>
      <p>Return ID: \{\{returnId\}\}</p>
      <p>Please ship the item back to the seller within 7 days.</p>
    `,
        variables: ['buyerName', 'productName', 'returnId']
    }
];

export const mockNotifications: Notification[] = [
    {
        id: 'notif-1',
        type: 'success',
        title: 'New Order Received',
        message: 'Jane Buyer placed an order for Vintage Leather Jacket',
        userId: '1',
        isRead: false,
        createdAt: new Date('2024-12-20T10:30:00'),
        metadata: { orderId: 'order-2', productId: 'prod-1' }
    },
    {
        id: 'notif-2',
        type: 'info',
        title: 'Product Status Updated',
        message: 'Your product "Designer Sneakers" is now live',
        userId: '4',
        isRead: false,
        createdAt: new Date('2024-12-19T15:45:00'),
        metadata: { productId: 'prod-2' }
    },
    {
        id: 'notif-3',
        type: 'warning',
        title: 'Return Request',
        message: 'A return request has been initiated for Silk Scarf',
        userId: '1',
        isRead: true,
        createdAt: new Date('2024-12-21T09:15:00'),
        metadata: { returnId: 'return-1', orderId: 'order-1' }
    }
];

let notificationCounter = 0;

const generateUniqueId = () => {
    return `notif-${Date.now()}-${notificationCounter++}-${Math.random().toString(36).substr(2, 9)}`;
};

export const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
        ...notification,
        id: generateUniqueId(),
        createdAt: new Date()
    };
    (mockNotifications as Notification[]).unshift(newNotification);
    return newNotification;
};

export const markNotificationAsRead = (notificationId: string) => {
    const notification = (mockNotifications as Notification[]).find(n => n.id === notificationId);
    if (notification) {
        notification.isRead = true;
    }
};

export const updateProductStatus = (productId: string, status: Product['status']) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
        product.status = status;
        product.updatedAt = new Date();
    }
};

export const updateUserStatus = (userId: string, status: User['status']) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
        user.status = status;
    }
};

export const updateUserBadgeLevel = (userId: string, badgeLevel: User['badgeLevel']) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
        user.badgeLevel = badgeLevel;
    }
};
