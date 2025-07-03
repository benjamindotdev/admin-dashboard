// internal imports
import { User, Product, Order, Notification, EmailTemplate, ReturnRequest } from '@/types';
import { triggerEvent } from '@/actions/notifications';

// Generate random IDs
const generateRandomId = () => Math.random().toString(36).substring(2, 15);

export const mockUsers: User[] = [
    {
        id: generateRandomId(),
        name: '@smail',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'seller',
        status: 'active',
        dateJoined: new Date('2024-01-15')
    },
    {
        id: generateRandomId(),
        name: '@benjamin',
        email: 'hello@benjamin.dev',
        type: 'seller pro',
        status: 'active',
        dateJoined: new Date('2023-11-20')
    },
    {
        id: generateRandomId(),
        name: '@style_hunter',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'buyer',
        status: 'active',
        dateJoined: new Date('2024-03-10')
    },
    {
        id: generateRandomId(),
        name: '@vintage_vibes',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'seller',
        status: 'pending',
        dateJoined: new Date('2024-12-01')
    },
    {
        id: generateRandomId(),
        name: '@trendy_shopper',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'buyer',
        status: 'active',
        dateJoined: new Date('2024-02-28')
    },
    {
        id: generateRandomId(),
        name: '@designer_deals',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'seller pro',
        status: 'active',
        dateJoined: new Date('2023-08-12')
    },
    {
        id: generateRandomId(),
        name: '@chic_closet',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'seller',
        status: 'suspended',
        dateJoined: new Date('2024-05-18')
    },
    {
        id: generateRandomId(),
        name: '@bargain_buyer',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'buyer',
        status: 'active',
        dateJoined: new Date('2024-07-22')
    },
    {
        id: generateRandomId(),
        name: '@premium_finds',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'seller pro',
        status: 'active',
        dateJoined: new Date('2024-01-05')
    },
    {
        id: generateRandomId(),
        name: '@street_style',
        email: 'smail.bensaad@trendiesmaroc.com',
        type: 'seller',
        status: 'pending',
        dateJoined: new Date('2024-11-15')
    }
];

export const mockOrders: Order[] = [
    {
        id: '12847',
        orderNumber: '12847',
        item: 'Louis Vuitton Neverfull MM',
        buyerId: mockUsers[2].id, // @style_hunter
        sellerId: mockUsers[0].id, // @fashionista_maya
        date: new Date('2024-12-18'),
        amount: 8500,
        currency: 'MAD',
        status: 'shipped',
        payoutStatus: 'paid'
    },
    {
        id: '19283',
        orderNumber: '19283',
        item: 'Gucci Ace Sneakers',
        buyerId: mockUsers[4].id, // @trendy_shopper
        sellerId: mockUsers[1].id, // @luxe_collector
        date: new Date('2024-12-20'),
        amount: 4200,
        currency: 'MAD',
        status: 'on hold',
        payoutStatus: 'processing'
    },
    {
        id: '33456',
        orderNumber: '33456',
        item: 'Hermès Silk Scarf',
        buyerId: mockUsers[7].id, // @bargain_buyer
        sellerId: mockUsers[5].id, // @designer_deals
        date: new Date('2024-12-15'),
        amount: 2800,
        currency: 'MAD',
        status: 'cancelled',
        payoutStatus: 'pending'
    },
    {
        id: '44789',
        orderNumber: '44789',
        item: 'Chanel Classic Flap Bag',
        buyerId: mockUsers[2].id, // @style_hunter
        sellerId: mockUsers[8].id, // @premium_finds
        date: new Date('2024-12-22'),
        amount: 15600,
        currency: 'MAD',
        status: 'shipped',
        payoutStatus: 'paid'
    },
    {
        id: '55012',
        orderNumber: '55012',
        item: 'Rolex Submariner Watch',
        buyerId: mockUsers[4].id, // @trendy_shopper
        sellerId: mockUsers[1].id, // @luxe_collector
        date: new Date('2024-12-10'),
        amount: 45000,
        currency: 'MAD',
        status: 'refunded',
        payoutStatus: 'pending'
    },
    {
        id: '66234',
        orderNumber: '66234',
        item: 'Balenciaga Triple S Sneakers',
        buyerId: mockUsers[7].id, // @bargain_buyer
        sellerId: mockUsers[0].id, // @fashionista_maya
        date: new Date('2024-12-12'),
        amount: 3500,
        currency: 'MAD',
        status: 'shipped',
        payoutStatus: 'paid'
    },
    {
        id: '77345',
        orderNumber: '77345',
        item: 'Dior Saddle Bag',
        buyerId: mockUsers[2].id, // @style_hunter
        sellerId: mockUsers[5].id, // @designer_deals
        date: new Date('2024-12-14'),
        amount: 12000,
        currency: 'MAD',
        status: 'on hold',
        payoutStatus: 'processing'
    },
    {
        id: '88567',
        orderNumber: '88567',
        item: 'Cartier Love Bracelet',
        buyerId: mockUsers[4].id, // @trendy_shopper
        sellerId: mockUsers[8].id, // @premium_finds
        date: new Date('2024-12-16'),
        amount: 8900,
        currency: 'MAD',
        status: 'shipped',
        payoutStatus: 'paid'
    },
    {
        id: '99678',
        orderNumber: '99678',
        item: 'Bottega Veneta Pouch',
        buyerId: mockUsers[7].id, // @bargain_buyer
        sellerId: mockUsers[1].id, // @luxe_collector
        date: new Date('2024-12-19'),
        amount: 6700,
        currency: 'MAD',
        status: 'cancelled',
        payoutStatus: 'pending'
    },
    {
        id: '10789',
        orderNumber: '10789',
        item: 'Off-White Jordan 1',
        buyerId: mockUsers[2].id, // @style_hunter
        sellerId: mockUsers[0].id, // @fashionista_maya
        date: new Date('2024-12-21'),
        amount: 5200,
        currency: 'MAD',
        status: 'shipped',
        payoutStatus: 'processing'
    },
    {
        id: '21890',
        orderNumber: '21890',
        item: 'Prada Re-Edition 2005',
        buyerId: mockUsers[4].id, // @trendy_shopper
        sellerId: mockUsers[5].id, // @designer_deals
        date: new Date('2024-12-13'),
        amount: 4800,
        currency: 'MAD',
        status: 'refunded',
        payoutStatus: 'pending'
    },
    {
        id: '32901',
        orderNumber: '32901',
        item: 'Tiffany & Co. Necklace',
        buyerId: mockUsers[7].id, // @bargain_buyer
        sellerId: mockUsers[8].id, // @premium_finds
        date: new Date('2024-12-17'),
        amount: 7200,
        currency: 'MAD',
        status: 'shipped',
        payoutStatus: 'paid'
    },
    {
        id: '43012',
        orderNumber: '43012',
        item: 'Versace Medusa Chain',
        buyerId: mockUsers[2].id, // @style_hunter
        sellerId: mockUsers[1].id, // @luxe_collector
        date: new Date('2024-12-11'),
        amount: 3200,
        currency: 'MAD',
        status: 'on hold',
        payoutStatus: 'processing'
    },
    {
        id: '54123',
        orderNumber: '54123',
        item: 'Goyard Saint Louis Tote',
        buyerId: mockUsers[4].id, // @trendy_shopper
        sellerId: mockUsers[0].id, // @fashionista_maya
        date: new Date('2024-12-09'),
        amount: 9800,
        currency: 'MAD',
        status: 'shipped',
        payoutStatus: 'paid'
    },
    {
        id: '65234',
        orderNumber: '65234',
        item: 'Golden Goose Sneakers',
        buyerId: mockUsers[7].id, // @bargain_buyer
        sellerId: mockUsers[5].id, // @designer_deals
        date: new Date('2024-12-08'),
        amount: 2900,
        currency: 'MAD',
        status: 'cancelled',
        payoutStatus: 'pending'
    },
    {
        id: '76345',
        orderNumber: '76345',
        item: 'Bulgari Serpenti Watch',
        buyerId: mockUsers[2].id, // @style_hunter
        sellerId: mockUsers[8].id, // @premium_finds
        date: new Date('2024-12-07'),
        amount: 18500,
        currency: 'MAD',
        status: 'shipped',
        payoutStatus: 'paid'
    },
    {
        id: '87456',
        orderNumber: '87456',
        item: 'Celine Luggage Bag',
        buyerId: mockUsers[4].id, // @trendy_shopper
        sellerId: mockUsers[1].id, // @luxe_collector
        date: new Date('2024-12-06'),
        amount: 11200,
        currency: 'MAD',
        status: 'refunded',
        payoutStatus: 'pending'
    },
    {
        id: '98567',
        orderNumber: '98567',
        item: 'Van Cleef Alhambra Bracelet',
        buyerId: mockUsers[7].id, // @bargain_buyer
        sellerId: mockUsers[0].id, // @fashionista_maya
        date: new Date('2024-12-05'),
        amount: 22000,
        currency: 'MAD',
        status: 'shipped',
        payoutStatus: 'processing'
    },
    {
        id: '09678',
        orderNumber: '09678',
        item: 'Fendi Baguette Bag',
        buyerId: mockUsers[2].id, // @style_hunter
        sellerId: mockUsers[5].id, // @designer_deals
        date: new Date('2024-12-04'),
        amount: 6800,
        currency: 'MAD',
        status: 'on hold',
        payoutStatus: 'processing'
    },
    {
        id: '19789',
        orderNumber: '19789',
        item: 'Patek Philippe Calatrava',
        buyerId: mockUsers[4].id, // @trendy_shopper
        sellerId: mockUsers[8].id, // @premium_finds
        date: new Date('2024-12-03'),
        amount: 85000,
        currency: 'MAD',
        status: 'shipped',
        payoutStatus: 'paid'
    }
];

export const mockProducts: Product[] = [
    {
        id: generateRandomId(),
        name: 'Louis Vuitton Neverfull MM',
        sellerId: mockUsers[0].id, // @fashionista_maya
        category: 'bags',
        brand: 'Louis Vuitton',
        price: 8500,
        currency: 'MAD',
        listedDate: new Date('2024-11-28'),
        status: 'sold',
        createdAt: new Date('2024-11-28'),
        updatedAt: new Date('2024-12-18')
    },
    {
        id: generateRandomId(),
        name: 'Gucci Ace Sneakers',
        sellerId: mockUsers[1].id, // @luxe_collector
        category: 'shoes',
        brand: 'Gucci',
        price: 4200,
        currency: 'MAD',
        listedDate: new Date('2024-12-01'),
        status: 'processing',
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date('2024-12-20')
    },
    {
        id: generateRandomId(),
        name: 'Hermès Silk Scarf',
        sellerId: mockUsers[5].id, // @designer_deals
        category: 'accessories',
        brand: 'Hermès',
        price: 2800,
        currency: 'MAD',
        listedDate: new Date('2024-11-20'),
        status: 'returned',
        createdAt: new Date('2024-11-20'),
        updatedAt: new Date('2024-12-15')
    },
    {
        id: generateRandomId(),
        name: 'Chanel Classic Flap Bag',
        sellerId: mockUsers[8].id, // @premium_finds
        category: 'bags',
        brand: 'Chanel',
        price: 15600,
        currency: 'MAD',
        listedDate: new Date('2024-12-05'),
        status: 'live',
        createdAt: new Date('2024-12-05'),
        updatedAt: new Date('2024-12-22')
    },
    {
        id: generateRandomId(),
        name: 'Rolex Submariner Watch',
        sellerId: mockUsers[1].id, // @luxe_collector
        category: 'accessories',
        brand: 'Rolex',
        price: 45000,
        currency: 'MAD',
        listedDate: new Date('2024-11-15'),
        status: 'review in progress',
        createdAt: new Date('2024-11-15'),
        updatedAt: new Date('2024-12-10')
    },
    {
        id: generateRandomId(),
        name: 'Balenciaga Triple S Sneakers',
        sellerId: mockUsers[0].id, // @fashionista_maya
        category: 'shoes',
        brand: 'Balenciaga',
        price: 3500,
        currency: 'MAD',
        listedDate: new Date('2024-11-25'),
        status: 'sold',
        createdAt: new Date('2024-11-25'),
        updatedAt: new Date('2024-12-12')
    },
    {
        id: generateRandomId(),
        name: 'Dior Saddle Bag',
        sellerId: mockUsers[5].id, // @designer_deals
        category: 'bags',
        brand: 'Dior',
        price: 12000,
        currency: 'MAD',
        listedDate: new Date('2024-12-02'),
        status: 'need more data',
        createdAt: new Date('2024-12-02'),
        updatedAt: new Date('2024-12-14')
    },
    {
        id: generateRandomId(),
        name: 'Cartier Love Bracelet',
        sellerId: mockUsers[8].id, // @premium_finds
        category: 'accessories',
        brand: 'Cartier',
        price: 8900,
        currency: 'MAD',
        listedDate: new Date('2024-11-30'),
        status: 'sold',
        createdAt: new Date('2024-11-30'),
        updatedAt: new Date('2024-12-16')
    },
    {
        id: generateRandomId(),
        name: 'Bottega Veneta Pouch',
        sellerId: mockUsers[1].id, // @luxe_collector
        category: 'bags',
        brand: 'Bottega Veneta',
        price: 6700,
        currency: 'MAD',
        listedDate: new Date('2024-12-08'),
        status: 'processing',
        createdAt: new Date('2024-12-08'),
        updatedAt: new Date('2024-12-19')
    },
    {
        id: generateRandomId(),
        name: 'Off-White Jordan 1',
        sellerId: mockUsers[0].id, // @fashionista_maya
        category: 'shoes',
        brand: 'Off-White x Nike',
        price: 5200,
        currency: 'MAD',
        listedDate: new Date('2024-12-10'),
        status: 'live',
        createdAt: new Date('2024-12-10'),
        updatedAt: new Date('2024-12-21')
    }
];

export const mockListings = [
    {
        id: generateRandomId(),
        productId: mockProducts[0].id,
        product: 'Louis Vuitton Neverfull MM',
        sellerId: mockUsers[0].id, // @fashionista_maya
        category: 'bags',
        brand: 'Louis Vuitton',
        price: 8500,
        currency: 'MAD',
        dateListed: new Date('2024-11-28'),
        authentication: 'verified',
        photoStatus: 'done',
        listingStatus: 'published'
    },
    {
        id: generateRandomId(),
        productId: mockProducts[1].id,
        product: 'Gucci Ace Sneakers',
        sellerId: mockUsers[1].id, // @luxe_collector
        category: 'shoes',
        brand: 'Gucci',
        price: 4200,
        currency: 'MAD',
        dateListed: new Date('2024-12-01'),
        authentication: 'pending',
        photoStatus: 'scheduled',
        listingStatus: 'authenticated'
    },
    {
        id: generateRandomId(),
        productId: mockProducts[2].id,
        product: 'Hermès Silk Scarf',
        sellerId: mockUsers[5].id, // @designer_deals
        category: 'accessories',
        brand: 'Hermès',
        price: 2800,
        currency: 'MAD',
        dateListed: new Date('2024-11-20'),
        authentication: 'verified',
        photoStatus: 'done',
        listingStatus: 'published'
    },
    {
        id: generateRandomId(),
        productId: mockProducts[3].id,
        product: 'Chanel Classic Flap Bag',
        sellerId: mockUsers[8].id, // @premium_finds
        category: 'bags',
        brand: 'Chanel',
        price: 15600,
        currency: 'MAD',
        dateListed: new Date('2024-12-05'),
        authentication: 'verified',
        photoStatus: 'done',
        listingStatus: 'published'
    },
    {
        id: generateRandomId(),
        productId: mockProducts[4].id,
        product: 'Rolex Submariner Watch',
        sellerId: mockUsers[1].id, // @luxe_collector
        category: 'accessories',
        brand: 'Rolex',
        price: 45000,
        currency: 'MAD',
        dateListed: new Date('2024-11-15'),
        authentication: 'pending',
        photoStatus: 'pending',
        listingStatus: 'submitted'
    },
    {
        id: generateRandomId(),
        productId: mockProducts[5].id,
        product: 'Balenciaga Triple S Sneakers',
        sellerId: mockUsers[0].id, // @fashionista_maya
        category: 'shoes',
        brand: 'Balenciaga',
        price: 3500,
        currency: 'MAD',
        dateListed: new Date('2024-11-25'),
        authentication: 'verified',
        photoStatus: 'done',
        listingStatus: 'published'
    },
    {
        id: generateRandomId(),
        productId: mockProducts[6].id,
        product: 'Dior Saddle Bag',
        sellerId: mockUsers[5].id, // @designer_deals
        category: 'bags',
        brand: 'Dior',
        price: 12000,
        currency: 'MAD',
        dateListed: new Date('2024-12-02'),
        authentication: 'pending',
        photoStatus: 'scheduled',
        listingStatus: 'authenticated'
    },
    {
        id: generateRandomId(),
        productId: mockProducts[7].id,
        product: 'Cartier Love Bracelet',
        sellerId: mockUsers[8].id, // @premium_finds
        category: 'accessories',
        brand: 'Cartier',
        price: 8900,
        currency: 'MAD',
        dateListed: new Date('2024-11-30'),
        authentication: 'verified',
        photoStatus: 'done',
        listingStatus: 'published'
    },
    {
        id: generateRandomId(),
        productId: mockProducts[8].id,
        product: 'Bottega Veneta Pouch',
        sellerId: mockUsers[1].id, // @luxe_collector
        category: 'bags',
        brand: 'Bottega Veneta',
        price: 6700,
        currency: 'MAD',
        dateListed: new Date('2024-12-08'),
        authentication: 'verified',
        photoStatus: 'scheduled',
        listingStatus: 'photographed'
    },
    {
        id: generateRandomId(),
        productId: mockProducts[9].id,
        product: 'Off-White Jordan 1',
        sellerId: mockUsers[0].id, // @fashionista_maya
        category: 'shoes',
        brand: 'Off-White x Nike',
        price: 5200,
        currency: 'MAD',
        dateListed: new Date('2024-12-10'),
        authentication: 'verified',
        photoStatus: 'done',
        listingStatus: 'published'
    }
];

// Keep the existing notification and email template structures
export const mockNotifications: Notification[] = [
    {
        id: 'notif-1',
        type: 'success',
        title: 'New Order Received',
        message: '@style_hunter placed an order for Louis Vuitton Neverfull MM',
        userId: mockUsers[0].id,
        isRead: false,
        createdAt: new Date('2024-12-20T10:30:00'),
        metadata: { orderId: '12847', productId: mockProducts[0].id }
    },
    {
        id: 'notif-2',
        type: 'info',
        title: 'Product Status Updated',
        message: 'Your product "Gucci Ace Sneakers" is now being processed',
        userId: mockUsers[1].id,
        isRead: false,
        createdAt: new Date('2024-12-19T15:45:00'),
        metadata: { productId: mockProducts[1].id }
    },
    {
        id: 'notif-3',
        type: 'warning',
        title: 'Authentication Required',
        message: 'Your Rolex Submariner Watch needs additional verification',
        userId: mockUsers[1].id,
        isRead: true,
        createdAt: new Date('2024-12-21T09:15:00'),
        metadata: { productId: mockProducts[4].id }
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
        <p style="margin-bottom:8px;color:#000;">Amount: {{amount}} MAD</p>
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

export const mockReturnRequests: ReturnRequest[] = [
    {
        id: 'return-1',
        orderId: '55012',
        reason: 'Item authenticity concerns',
        status: 'pending',
        createdAt: new Date('2024-12-21')
    }
];

// Keep existing utility functions
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

    // Emit notification to subscribers if we're in browser environment
    if (typeof window !== 'undefined') {
        // Dynamically import to avoid circular dependencies
        import('@/lib/notificationService').then(({ emitNotification }) => {
            if (emitNotification) {
                emitNotification(newNotification);
            }
        }).catch(error => {
            console.error('Failed to emit notification:', error);
        });
    }

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

// Simulation service for random notifications
class NotificationSimulator {
    private isRunning = false;
    private timeoutId: NodeJS.Timeout | null = null;
    private subscribers: Array<() => void> = [];

    private getRandomUser() {
        return mockUsers[Math.floor(Math.random() * mockUsers.length)];
    }

    private getRandomProduct() {
        return mockProducts[Math.floor(Math.random() * mockProducts.length)];
    }

    private getRandomInterval() {
        // Random interval between 5-12 seconds
        return Math.floor(Math.random() * 7000) + 5000;
    }

    private async generateRandomInteraction() {
        const otherUser = this.getRandomUser();
        const product = this.getRandomProduct();

        const interactions = [
            // New user registration
            async () => {
                const newUser = {
                    id: generateRandomId(),
                    name: `@new_user_${Math.floor(Math.random() * 1000)}`,
                    email: 'smail.bensaad@trendiesmaroc.com',
                    type: Math.random() > 0.5 ? 'seller' : 'buyer' as 'seller' | 'buyer',
                    status: 'pending' as const,
                    dateJoined: new Date()
                };
                mockUsers.push(newUser);

                // Trigger server-side notification and email processing
                await triggerEvent('status_updated', {
                    userId: newUser.id,
                    userName: newUser.name,
                    userType: newUser.type,
                    userEmail: newUser.email,
                    eventType: 'user_registered'
                });

                const notification = addNotification({
                    type: 'info',
                    title: 'New User Registration',
                    message: `${newUser.name} has joined Trendies as a ${newUser.type}`,
                    userId: 'admin',
                    isRead: false,
                    metadata: { userId: newUser.id }
                });
                this.notifySubscribers();
                return notification;
            },

            // New order with email
            async () => {
                const newOrder = {
                    id: generateRandomId(),
                    orderNumber: (Math.floor(Math.random() * 90000) + 10000).toString(),
                    item: product.name,
                    buyerId: otherUser.id,
                    sellerId: product.sellerId,
                    date: new Date(),
                    amount: Math.floor(Math.random() * 10000) + 1000,
                    currency: 'MAD' as const,
                    status: Math.random() > 0.7 ? 'on hold' : 'shipped' as 'shipped' | 'on hold',
                    payoutStatus: 'processing' as const
                };
                mockOrders.unshift(newOrder);

                // Trigger server-side order confirmation email and notification
                const seller = mockUsers.find(u => u.id === product.sellerId);
                if (seller) {
                    await triggerEvent('order_confirmed', {
                        orderId: newOrder.id,
                        orderNumber: newOrder.orderNumber,
                        buyerEmail: otherUser.email,
                        buyerName: otherUser.name,
                        productName: product.name,
                        sellerName: seller.name,
                        amount: newOrder.amount,
                        currency: newOrder.currency
                    });
                }

                const notification = addNotification({
                    type: 'success',
                    title: 'New Order Received',
                    message: `${otherUser.name} placed an order for ${product.name}`,
                    userId: product.sellerId,
                    isRead: false,
                    metadata: {
                        orderId: newOrder.id,
                        productId: product.id,
                        buyerId: otherUser.id
                    }
                });
                this.notifySubscribers();
                return notification;
            },

            // User status change with email
            async () => {
                const pendingUsers = mockUsers.filter(u => u.status === 'pending');
                if (pendingUsers.length > 0) {
                    const userToUpdate = pendingUsers[Math.floor(Math.random() * pendingUsers.length)];
                    userToUpdate.status = 'active';

                    // Trigger server-side seller approval email if it's a seller
                    if (userToUpdate.type === 'seller' || userToUpdate.type === 'seller pro') {
                        await triggerEvent('seller_account_approved', {
                            userId: userToUpdate.id,
                            userName: userToUpdate.name,
                            userEmail: userToUpdate.email,
                            userType: userToUpdate.type
                        });
                    }

                    const notification = addNotification({
                        type: 'success',
                        title: 'User Approved',
                        message: `${userToUpdate.name} account has been approved and is now active`,
                        userId: 'admin',
                        isRead: false,
                        metadata: { userId: userToUpdate.id }
                    });
                    this.notifySubscribers();
                    return notification;
                }

                // Fallback notification
                const notification = addNotification({
                    type: 'info',
                    title: 'System Update',
                    message: `Platform maintenance completed successfully`,
                    userId: 'admin',
                    isRead: false,
                    metadata: {}
                });
                this.notifySubscribers();
                return notification;
            },

            // Return request with email
            async () => {
                const recentOrders = mockOrders.filter(o => o.status === 'shipped').slice(0, 5);
                if (recentOrders.length > 0) {
                    const orderForReturn = recentOrders[Math.floor(Math.random() * recentOrders.length)];
                    const returnId = generateRandomId();

                    // Add return request
                    mockReturnRequests.push({
                        id: returnId,
                        orderId: orderForReturn.id,
                        reason: 'Item not as described',
                        status: 'pending',
                        createdAt: new Date()
                    });

                    // Trigger server-side return accepted email
                    const buyer = mockUsers.find(u => u.id === orderForReturn.buyerId);
                    if (buyer) {
                        await triggerEvent('return_accepted', {
                            returnId: returnId,
                            orderId: orderForReturn.id,
                            buyerEmail: buyer.email,
                            buyerName: buyer.name,
                            productName: orderForReturn.item,
                            orderNumber: orderForReturn.orderNumber
                        });
                    }

                    const notification = addNotification({
                        type: 'warning',
                        title: 'Return Request',
                        message: `Return request submitted for ${orderForReturn.item}`,
                        userId: orderForReturn.sellerId,
                        isRead: false,
                        metadata: {
                            orderId: orderForReturn.id,
                            returnId: returnId
                        }
                    });
                    this.notifySubscribers();
                    return notification;
                }

                // Fallback notification
                const notification = addNotification({
                    type: 'info',
                    title: 'System Check',
                    message: `All orders are processing normally`,
                    userId: 'admin',
                    isRead: false,
                    metadata: {}
                });
                this.notifySubscribers();
                return notification;
            }
        ];

        const randomInteraction = interactions[Math.floor(Math.random() * interactions.length)];
        return randomInteraction();
    }

    private notifySubscribers() {
        this.subscribers.forEach(callback => callback());
    }

    private scheduleNext() {
        if (!this.isRunning) return;

        const interval = this.getRandomInterval();
        this.timeoutId = setTimeout(async () => {
            try {
                const notification = await this.generateRandomInteraction();
                console.log(`📱 New notification: ${notification.title} - ${notification.message}`);

                // Show notification in UI if available
                if (typeof window !== 'undefined' && 'showNotification' in window) {
                    (window as { showNotification: (notification: Notification) => void }).showNotification(notification);
                }
            } catch (error) {
                console.error('Error generating notification:', error);
            }

            this.scheduleNext();
        }, interval);
    }

    // Subscribe to data changes
    subscribe(callback: () => void) {
        this.subscribers.push(callback);
        return () => {
            const index = this.subscribers.indexOf(callback);
            if (index > -1) {
                this.subscribers.splice(index, 1);
            }
        };
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        console.log('🚀 Notification simulator started');

        this.scheduleNext();
    }

    stop() {
        this.isRunning = false;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        console.log('⏹️ Notification simulator stopped');
    }

    isActive() {
        return this.isRunning;
    }
}

// Export singleton instance
export const notificationSimulator = new NotificationSimulator();

// Auto-start simulation in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Start simulation after a short delay to ensure everything is loaded
    setTimeout(() => {
        notificationSimulator.start();
    }, 2000);
}