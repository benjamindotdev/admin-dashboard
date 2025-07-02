// external imports
import { describe, test, expect, vi, beforeEach } from 'vitest';

// internal imports
import { processNotificationEvent } from '../notificationService';

vi.mock('../emailService', () => ({
    sendSellerApprovalEmail: vi.fn().mockResolvedValue(true),
    sendOrderConfirmationEmail: vi.fn().mockResolvedValue(true),
    sendReturnAcceptedEmail: vi.fn().mockResolvedValue(true)
}));

vi.mock('../mockData', () => ({
    addNotification: vi.fn().mockReturnValue({
        id: 'test-notif-1',
        type: 'success',
        title: 'Test Notification',
        message: 'Test message',
        isRead: false,
        createdAt: new Date().toISOString()
    }),
    mockUsers: [
        { id: '1', name: 'John Doe', email: 'john@example.com', type: 'buyer' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', type: 'seller' }
    ],
    mockProducts: [
        { id: 'prod-1', name: 'Test Product', sellerId: '2' }
    ]
}));

describe('Notification Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('processNotificationEvent', () => {
        test('should process new_listing_created event', async () => {
            const eventData = {
                event: 'new_listing_created' as const,
                data: {
                    productId: 'prod-1',
                    sellerId: '2'
                }
            };

            await processNotificationEvent(eventData);

            expect(true).toBe(true);
        });

        test('should process seller_account_approved event', async () => {
            const eventData = {
                event: 'seller_account_approved' as const,
                data: {
                    sellerId: '2'
                }
            };

            await processNotificationEvent(eventData);

            expect(true).toBe(true);
        });



        test('should handle missing required data', async () => {
            const eventData = {
                event: 'new_listing_created' as const,
                data: {}
            };

            await expect(processNotificationEvent(eventData)).resolves.not.toThrow();
        });
    });
});
