// internal imports
import { User, Product, Order, Notification, EmailTemplate, ReturnRequest } from '@/types';

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'John Seller',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'seller',
        status: 'approved',
        badgeLevel: 'Pro'
    },
    {
        id: '2',
        name: 'Jane Buyer',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'buyer',
        status: 'active'
    },
    {
        id: '3',
        name: 'Mike Admin',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'admin',
        status: 'active'
    },
    {
        id: '4',
        name: 'Sarah Elite',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'seller',
        status: 'approved',
        badgeLevel: 'Elite'
    },
    {
        id: '5',
        name: 'Tom Pending',
        email: 'smail.bensaad@trendiesmaroc.com',
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
  <body style="margin:0;padding:0;">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:32px 0;background:#fff;">
      <div style="background:#fff;border-radius:8px;box-shadow:0 2px 8px #0001;padding:32px 24px;max-width:480px;width:100%;text-align:center;">
        <h1 style="margin-bottom:16px;color:#000;">Congratulations, {{sellerName}}!</h1>
        <p style="margin-bottom:8px;color:#000;">Your seller account has been approved. You can now start listing your items.</p>
        <p style="margin-bottom:16px;color:#000;">Your current badge level: <strong>{{badgeLevel}}</strong></p>
        <a href="{{dashboardUrl}}" style="display:inline-block;padding:12px 24px;background:#fff;color:#000;text-decoration:underline;border-radius:4px;font-weight:bold;border:1px solid #000;">Go to Dashboard</a>
      </div>
    </div>
  </body>
    `,
        variables: ['sellerName', 'badgeLevel', 'dashboardUrl']
    },
    {
        id: 'order-confirmation',
        name: 'Order Confirmation',
        subject: 'Order Confirmed - {{productName}}',
        htmlContent: `
  <body style="margin:0;padding:0;">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:32px 0;background:#fff;">
      <div style="background:#fff;border-radius:8px;box-shadow:0 2px 8px #0001;padding:32px 24px;max-width:480px;width:100%;text-align:center;">
        <h1 style="margin-bottom:16px;color:#000;">Order Confirmed!</h1>
        <p style="margin-bottom:8px;color:#000;">Hi {{buyerName}},</p>
        <p style="margin-bottom:8px;color:#000;">Your order for <strong>{{productName}}</strong> has been confirmed.</p>
        <p style="margin-bottom:8px;color:#000;">Order ID: {{orderId}}</p>
        <p style="margin-bottom:8px;color:#000;">Amount: ${{ amount }}</p>
        <p style="margin-bottom:16px;color:#000;">Seller: {{sellerName}}</p>
      </div>
    </div>
  </body>
    `,
        variables: ['buyerName', 'productName', 'orderId', 'amount', 'sellerName']
    },
    {
        id: 'return-accepted',
        name: 'Return Request Accepted',
        subject: 'Return Request Approved - {{productName}}',
        htmlContent: `
  <body style="margin:0;padding:0;">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:32px 0;background:#fff;">
      <div style="background:#fff;border-radius:8px;box-shadow:0 2px 8px #0001;padding:32px 24px;max-width:480px;width:100%;text-align:center;">
        <h1 style="margin-bottom:16px;color:#000;">Return Request Approved</h1>
        <p style="margin-bottom:8px;color:#000;">Hi {{buyerName}},</p>
        <p style="margin-bottom:8px;color:#000;">Your return request for <strong>{{productName}}</strong> has been approved.</p>
        <p style="margin-bottom:8px;color:#000;">Return ID: {{returnId}}</p>
        <p style="margin-bottom:16px;color:#000;">Please ship the item back to the seller within 7 days.</p>
      </div>
    </div>
  </body>
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
