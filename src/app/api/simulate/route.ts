import { NextRequest, NextResponse } from 'next/server';
import { sendSellerApprovalEmail, sendOrderConfirmationEmail, sendReturnAcceptedEmail } from '@/lib/emailService';
import { mockUsers, mockProducts, mockOrders, mockReturnRequests, addNotification } from '@/lib/mockData';

// Generate random IDs
const generateRandomId = () => Math.random().toString(36).substring(2, 15);

export async function POST(request: NextRequest) {
    try {
        const { action } = await request.json();

        if (action === 'simulate') {
            const result = await generateRandomInteraction();
            return NextResponse.json(result);
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Simulation API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

async function generateRandomInteraction() {
    const getRandomUser = () => mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const getRandomProduct = () => mockProducts[Math.floor(Math.random() * mockProducts.length)];

    const otherUser = getRandomUser();
    const product = getRandomProduct();

    const interactions = [
        // New user registration
        async () => {
            const newUser = {
                id: generateRandomId(),
                name: `@new_user_${Math.floor(Math.random() * 1000)}`,
                email: 'hello@benjamin.dev',
                type: Math.random() > 0.5 ? 'seller' : 'buyer' as 'seller' | 'buyer',
                status: 'pending' as const,
                dateJoined: new Date()
            };
            mockUsers.push(newUser);

            const notification = addNotification({
                type: 'info',
                title: 'New User Registration',
                message: `${newUser.name} has joined Trendies as a ${newUser.type}`,
                userId: 'admin',
                isRead: false,
                metadata: { userId: newUser.id }
            });

            return {
                type: 'user_registration',
                notification,
                emailSent: false,
                user: newUser
            };
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

            // Send order confirmation email
            const seller = mockUsers.find(u => u.id === product.sellerId);
            let emailSent = false;

            if (seller) {
                try {
                    await sendOrderConfirmationEmail(
                        newOrder.id,
                        otherUser.email,
                        product.name,
                        seller.name,
                        newOrder.amount
                    );
                    emailSent = true;
                    console.log('📧 Order confirmation email sent to:', otherUser.email);
                } catch (error) {
                    console.error('❌ Failed to send order email:', error);
                }
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

            return {
                type: 'new_order',
                notification,
                emailSent,
                order: newOrder
            };
        },

        // User status change with email
        async () => {
            const pendingUsers = mockUsers.filter(u => u.status === 'pending');
            let emailSent = false;
            let userToUpdate = null;

            if (pendingUsers.length > 0) {
                userToUpdate = pendingUsers[Math.floor(Math.random() * pendingUsers.length)];
                userToUpdate.status = 'active';

                // Send seller approval email if it's a seller
                if (userToUpdate.type === 'seller' || userToUpdate.type === 'seller pro') {
                    try {
                        await sendSellerApprovalEmail(userToUpdate.id);
                        emailSent = true;
                        console.log('📧 Seller approval email sent to:', userToUpdate.email);
                    } catch (error) {
                        console.error('❌ Failed to send seller approval email:', error);
                    }
                }

                const notification = addNotification({
                    type: 'success',
                    title: 'User Approved',
                    message: `${userToUpdate.name} account has been approved and is now active`,
                    userId: 'admin',
                    isRead: false,
                    metadata: { userId: userToUpdate.id }
                });

                return {
                    type: 'user_approval',
                    notification,
                    emailSent,
                    user: userToUpdate
                };
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

            return {
                type: 'system_update',
                notification,
                emailSent: false
            };
        },

        // Return request with email
        async () => {
            const recentOrders = mockOrders.filter(o => o.status === 'shipped').slice(0, 5);
            let emailSent = false;

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

                // Send return accepted email
                const buyer = mockUsers.find(u => u.id === orderForReturn.buyerId);
                if (buyer) {
                    try {
                        await sendReturnAcceptedEmail(
                            buyer.email,
                            orderForReturn.item,
                            returnId
                        );
                        emailSent = true;
                        console.log('📧 Return accepted email sent to:', buyer.email);
                    } catch (error) {
                        console.error('❌ Failed to send return email:', error);
                    }
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

                return {
                    type: 'return_request',
                    notification,
                    emailSent,
                    returnRequest: { id: returnId, orderId: orderForReturn.id }
                };
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

            return {
                type: 'system_check',
                notification,
                emailSent: false
            };
        }
    ];

    const randomInteraction = interactions[Math.floor(Math.random() * interactions.length)];
    return randomInteraction();
}
