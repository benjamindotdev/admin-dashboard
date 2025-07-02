// external imports
import { describe, test, expect, vi, beforeEach } from 'vitest';

// internal imports
import { sendSellerApprovalEmail } from '../emailService';

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.mock('../mockData', () => ({
    mockUsers: [
        { id: '1', name: 'John Doe', email: 'john@example.com', type: 'seller' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', type: 'buyer' }
    ],
    mockEmailTemplates: [
        {
            id: 'seller-approval',
            subject: 'Account Approved',
            htmlContent: '<p>Your seller account has been approved!</p>',
            variables: ['sellerName', 'badgeLevel']
        },
        {
            id: 'order-confirmation',
            subject: 'Order Confirmed',
            htmlContent: '<p>Your order for {{productName}} has been confirmed!</p>',
            variables: ['buyerName', 'productName', 'orderId', 'amount', 'sellerName']
        },
        {
            id: 'return-accepted',
            subject: 'Return Accepted',
            htmlContent: '<p>Your return for {{productName}} has been accepted!</p>',
            variables: ['buyerName', 'productName', 'returnId']
        }
    ]
}));

describe('Email Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetModules();
        process.env.BREVO_API_KEY = 'test-api-key';
    });

    test('should send seller approval email successfully', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ messageId: 'test-message-id' })
        });

        const result = await sendSellerApprovalEmail('1');

        expect(result).toBe(true);
        expect(mockFetch).toHaveBeenCalledWith(
            'https://api.brevo.com/v3/smtp/email',
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                    'api-key': 'test-api-key'
                })
            })
        );
    });

    test('should handle API failure', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            text: () => Promise.resolve('Bad Request')
        });

        const result = await sendSellerApprovalEmail('1');

        expect(result).toBe(false);
    });

    test('should handle network errors', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        const result = await sendSellerApprovalEmail('1');

        expect(result).toBe(false);
    });
});
