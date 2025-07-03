// internal imports
import { NotificationEvent, EventData, Notification } from '@/types';
import { addNotification, mockUsers, mockProducts, mockOrders } from '@/lib/mockData';
import { sendSellerApprovalEmail, sendOrderConfirmationEmail, sendReturnAcceptedEmail } from '@/lib/emailService';

const subscribers: Array<(notification: Notification) => void> = [];

export function subscribeToNotifications(callback: (notification: Notification) => void) {
    subscribers.push(callback);
    return () => {
        const index = subscribers.indexOf(callback);
        if (index > -1) {
            subscribers.splice(index, 1);
        }
    };
}

function emitNotification(notification: Notification) {
    subscribers.forEach(callback => callback(notification));
}

// Export emitNotification so it can be used by other modules
export { emitNotification };

export async function processNotificationEvent(eventData: EventData): Promise<void> {
    console.log(`🔔 Processing event: ${eventData.event}`, eventData.data);

    switch (eventData.event) {
        case 'new_listing_created':
            await handleNewListingCreated(eventData);
            break;
        case 'seller_account_approved':
            await handleSellerAccountApproved(eventData);
            break;
        case 'product_marked_live':
            await handleProductMarkedLive(eventData);
            break;
        case 'order_placed':
            await handleOrderPlaced(eventData);
            break;
        case 'return_request_initiated':
            await handleReturnRequestInitiated(eventData);
            break;
        case 'order_confirmed':
            await handleOrderConfirmed(eventData);
            break;
        case 'return_accepted':
            await handleReturnAccepted(eventData);
            break;
        case 'status_updated':
            await handleStatusUpdated(eventData);
            break;
    }
}

async function handleNewListingCreated(eventData: EventData) {
    const { productId, sellerId } = eventData.data;
    const product = mockProducts.find(p => p.id === productId);
    const seller = mockUsers.find(u => u.id === sellerId);

    if (product && seller) {
        addNotification({
            type: 'info',
            title: 'New Listing Created',
            message: `${seller.name} created a new listing: ${product.name}`,
            userId: sellerId as string,
            isRead: false,
            metadata: { productId, sellerId }
        });

        addNotification({
            type: 'info',
            title: 'New Listing Pending Review',
            message: `${product.name} by ${seller.name} is pending review`,
            isRead: false,
            metadata: { productId, sellerId }
        });
    }
}

async function handleSellerAccountApproved(eventData: EventData) {
    const { userId, userName, userEmail, userType } = eventData.data;

    // Send seller approval email
    try {
        await sendSellerApprovalEmail(userId as string);
        console.log('📧 Seller approval email sent to:', userEmail);
    } catch (error) {
        console.error('❌ Failed to send seller approval email:', error);
    }

    addNotification({
        type: 'success',
        title: 'Account Approved!',
        message: `${userName} (${userType}) account has been approved and is now active`,
        userId: userId as string,
        isRead: false,
        metadata: { userId, userType }
    });
}

async function handleProductMarkedLive(eventData: EventData) {
    const { productId, sellerId } = eventData.data;
    const product = mockProducts.find(p => p.id === productId);

    if (product) {
        addNotification({
            type: 'success',
            title: 'Product is Live!',
            message: `The product "${product.name}" is now live and visible to buyers`,
            userId: sellerId as string,
            isRead: false,
            metadata: { productId, sellerId }
        });
    }
}

async function handleOrderPlaced(eventData: EventData) {
    const { orderId, productId, buyerId, sellerId } = eventData.data;
    const product = mockProducts.find(p => p.id === productId);
    const buyer = mockUsers.find(u => u.id === buyerId);

    if (product && buyer) {
        addNotification({
            type: 'success',
            title: 'New Order Received',
            message: `${buyer.name} placed an order for ${product.name}`,
            userId: sellerId as string,
            isRead: false,
            metadata: { orderId, productId: product.id }
        });

        addNotification({
            type: 'info',
            title: 'Order Placed',
            message: `The order for ${product.name} has been placed successfully`,
            userId: buyerId as string,
            isRead: false,
            metadata: { orderId, productId: product.id }
        });
    }
}

async function handleReturnRequestInitiated(eventData: EventData) {
    const { returnId, orderId, buyerId } = eventData.data;
    const order = mockOrders.find(o => o.id === orderId);
    const product = mockProducts.find(p => p.id === order?.id);

    if (order && product) {
        addNotification({
            type: 'warning',
            title: 'Return Request',
            message: `A return request has been initiated for ${product.name}`,
            userId: order.sellerId as string,
            isRead: false,
            metadata: { returnId, orderId }
        });

        addNotification({
            type: 'info',
            title: 'Return Request Submitted',
            message: `The return request for ${product.name} has been submitted`,
            userId: buyerId as string,
            isRead: false,
            metadata: { returnId, orderId }
        });
    }
}

async function handleOrderConfirmed(eventData: EventData) {
    const {
        orderId,
        buyerEmail,
        productName,
        sellerName,
        amount
    } = eventData.data;

    // Send order confirmation email
    try {
        await sendOrderConfirmationEmail(
            orderId as string,
            buyerEmail as string,
            productName as string,
            sellerName as string,
            amount as number
        );
        console.log('📧 Order confirmation email sent to:', buyerEmail);
    } catch (error) {
        console.error('❌ Failed to send order confirmation email:', error);
    }

    // Find the order to get buyer ID for notification
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
        addNotification({
            type: 'success',
            title: 'Order Confirmed',
            message: `Order confirmation email sent for ${productName}`,
            userId: order.buyerId,
            isRead: false,
            metadata: { orderId, productName }
        });
    }
}

async function handleReturnAccepted(eventData: EventData) {
    const {
        returnId,
        orderId,
        buyerEmail,
        buyerName,
        productName
    } = eventData.data;

    // Send return accepted email
    try {
        await sendReturnAcceptedEmail(
            buyerEmail as string,
            productName as string,
            returnId as string
        );
        console.log('📧 Return accepted email sent to:', buyerEmail);
    } catch (error) {
        console.error('❌ Failed to send return accepted email:', error);
    }

    // Find the order to get buyer ID for notification
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
        addNotification({
            type: 'success',
            title: 'Return Approved',
            message: `Return request approved for ${productName} - email sent to ${buyerName}`,
            userId: order.buyerId,
            isRead: false,
            metadata: { returnId, orderId, productName }
        });
    }
}

async function handleStatusUpdated(eventData: EventData) {
    const { eventType, userId, userName, userType, userEmail } = eventData.data;

    if (eventType === 'user_registered') {
        // Handle new user registration
        console.log(`📧 New user registered: ${userName} (${userType}) - ${userEmail}`);

        addNotification({
            type: 'info',
            title: 'New User Registration',
            message: `${userName} registered as ${userType} - email: ${userEmail}`,
            userId: 'admin',
            isRead: false,
            metadata: { userId, userType, eventType }
        });
    } else {
        // Handle other status updates
        const { type, id, oldStatus, newStatus } = eventData.data;

        addNotification({
            type: 'info',
            title: 'Status Updated',
            message: `${type} status changed from ${oldStatus} to ${newStatus}`,
            userId: userId as string | undefined,
            isRead: false,
            metadata: { type, id, oldStatus, newStatus }
        });
    }
}

export async function simulateNotificationEvent(
    event: NotificationEvent,
    data: Record<string, unknown>,
    delay: number = 1000
) {
    setTimeout(async () => {
        await processNotificationEvent({ event, data });
    }, delay);
}