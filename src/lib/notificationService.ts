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
        const notification = addNotification({
            type: 'info',
            title: 'New Listing Created',
            message: `${seller.name} created a new listing: ${product.name}`,
            userId: sellerId as string,
            isRead: false,
            metadata: { productId, sellerId }
        });

        emitNotification(notification);

        const adminNotification = addNotification({
            type: 'info',
            title: 'New Listing Pending Review',
            message: `${product.name} by ${seller.name} is pending review`,
            isRead: false,
            metadata: { productId, sellerId }
        });

        emitNotification(adminNotification);
    }
}

async function handleSellerAccountApproved(eventData: EventData) {
    const { sellerId } = eventData.data;
    const seller = mockUsers.find(u => u.id === sellerId);

    if (seller) {
        const notification = addNotification({
            type: 'success',
            title: 'Account Approved!',
            message: 'Your seller account has been approved. You can now start listing items.',
            userId: sellerId as string,
            isRead: false,
            metadata: { sellerId }
        });

        emitNotification(notification);

        await sendSellerApprovalEmail(sellerId as string);
    }
}

async function handleProductMarkedLive(eventData: EventData) {
    const { productId, sellerId } = eventData.data;
    const product = mockProducts.find(p => p.id === productId);

    if (product) {
        const notification = addNotification({
            type: 'success',
            title: 'Product is Live!',
            message: `Your product "${product.name}" is now live and visible to buyers`,
            userId: sellerId as string,
            isRead: false,
            metadata: { productId }
        });

        emitNotification(notification);
    }
}

async function handleOrderPlaced(eventData: EventData) {
    const { orderId, buyerId, sellerId } = eventData.data;
    const order = mockOrders.find(o => o.id === orderId);
    const product = mockProducts.find(p => p.id === order?.productId);
    const buyer = mockUsers.find(u => u.id === buyerId);

    if (order && product && buyer) {
        const sellerNotification = addNotification({
            type: 'success',
            title: 'New Order Received!',
            message: `${buyer.name} placed an order for ${product.name}`,
            userId: sellerId as string,
            isRead: false,
            metadata: { orderId, productId: product.id }
        });

        emitNotification(sellerNotification);

        const buyerNotification = addNotification({
            type: 'info',
            title: 'Order Placed',
            message: `Your order for ${product.name} has been placed successfully`,
            userId: buyerId as string,
            isRead: false,
            metadata: { orderId, productId: product.id }
        });

        emitNotification(buyerNotification);
    }
}

async function handleReturnRequestInitiated(eventData: EventData) {
    const { returnId, orderId, buyerId } = eventData.data;
    const order = mockOrders.find(o => o.id === orderId);
    const product = mockProducts.find(p => p.id === order?.productId);

    if (order && product) {
        const sellerNotification = addNotification({
            type: 'warning',
            title: 'Return Request',
            message: `A return request has been initiated for ${product.name}`,
            userId: order.sellerId as string,
            isRead: false,
            metadata: { returnId, orderId }
        });

        emitNotification(sellerNotification);

        const buyerNotification = addNotification({
            type: 'info',
            title: 'Return Request Submitted',
            message: `Your return request for ${product.name} has been submitted`,
            userId: buyerId as string,
            isRead: false,
            metadata: { returnId, orderId }
        });

        emitNotification(buyerNotification);
    }
}

async function handleOrderConfirmed(eventData: EventData) {
    const { orderId } = eventData.data;
    const order = mockOrders.find(o => o.id === orderId);
    const product = mockProducts.find(p => p.id === order?.productId);
    const buyer = mockUsers.find(u => u.id === order?.buyerId);
    const seller = mockUsers.find(u => u.id === order?.sellerId);

    if (order && product && buyer && seller) {
        await sendOrderConfirmationEmail(
            orderId as string,
            buyer.email,
            product.name,
            seller.name,
            order.amount
        );

        const notification = addNotification({
            type: 'success',
            title: 'Order Confirmed',
            message: `Your order for ${product.name} has been confirmed`,
            userId: order.buyerId as string,
            isRead: false,
            metadata: { orderId }
        });

        emitNotification(notification);
    }
}

async function handleReturnAccepted(eventData: EventData) {
    const { returnId, orderId } = eventData.data;
    const order = mockOrders.find(o => o.id === orderId);
    const product = mockProducts.find(p => p.id === order?.productId);
    const buyer = mockUsers.find(u => u.id === order?.buyerId);

    if (order && product && buyer) {
        await sendReturnAcceptedEmail(
            buyer.email,
            product.name,
            returnId as string
        );

        const notification = addNotification({
            type: 'success',
            title: 'Return Approved',
            message: `Your return request for ${product.name} has been approved`,
            userId: order.buyerId as string,
            isRead: false,
            metadata: { returnId, orderId }
        });

        emitNotification(notification);
    }
}

async function handleStatusUpdated(eventData: EventData) {
    const { type, id, oldStatus, newStatus, userId } = eventData.data;

    const notification = addNotification({
        type: 'info',
        title: 'Status Updated',
        message: `${type} status changed from ${oldStatus} to ${newStatus}`,
        userId: userId as string | undefined,
        isRead: false,
        metadata: { type, id, oldStatus, newStatus }
    });

    emitNotification(notification);
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
