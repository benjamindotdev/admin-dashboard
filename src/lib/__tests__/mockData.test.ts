
// external imports
import { describe, test, expect } from 'vitest';

// internal imports
import {
    mockUsers,
    mockProducts,
    mockOrders,
    addNotification
} from '../mockData';

describe('Mock Data', () => {
    describe('mockUsers', () => {
        test('should have users with required properties', () => {
            expect(mockUsers.length).toBeGreaterThan(0);

            const user = mockUsers[0];
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('status');
            expect(user).toHaveProperty('type');
        });

        test('should have valid email formats', () => {
            mockUsers.forEach(user => {
                expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            });
        });
    });

    describe('mockProducts', () => {
        test('should have products with required properties', () => {
            expect(mockProducts.length).toBeGreaterThan(0);

            const product = mockProducts[0];
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('status');
            expect(product).toHaveProperty('sellerId');
        });

        test('should have positive prices', () => {
            mockProducts.forEach(product => {
                expect(product.price).toBeGreaterThan(0);
            });
        });
    });

    describe('mockOrders', () => {
        test('should have orders with required properties', () => {
            expect(mockOrders.length).toBeGreaterThan(0);

            const order = mockOrders[0];
            expect(order).toHaveProperty('id');
            expect(order).toHaveProperty('buyerId');
            expect(order).toHaveProperty('productId');
            expect(order).toHaveProperty('status');
            expect(order).toHaveProperty('amount');
        });

        test('should have valid statuses', () => {
            const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
            mockOrders.forEach(order => {
                expect(validStatuses).toContain(order.status);
            });
        });
    });

    describe('addNotification', () => {
        test('should generate unique IDs for rapid notifications', () => {
            const ids = new Set<string>();
            for (let i = 0; i < 100; i++) {
                const notification = addNotification({
                    type: 'info',
                    title: `Test ${i}`,
                    message: `Test message ${i}`,
                    isRead: false
                });
                expect(ids.has(notification.id)).toBe(false);
                ids.add(notification.id);
            }
            expect(ids.size).toBe(100);
        });

        test('should generate IDs with correct format', () => {
            const notification = addNotification({
                type: 'success',
                title: 'Test',
                message: 'Test message',
                isRead: false
            });
            expect(notification.id).toMatch(/^notif-\d+-\d+-[a-z0-9]+$/);
        });

        test('should add notification with all required properties', () => {
            const notification = addNotification({
                type: 'warning',
                title: 'Test Warning',
                message: 'Test warning message',
                isRead: false
            });

            expect(notification).toHaveProperty('id');
            expect(notification).toHaveProperty('createdAt');
            expect(notification.type).toBe('warning');
            expect(notification.title).toBe('Test Warning');
            expect(notification.message).toBe('Test warning message');
            expect(notification.isRead).toBe(false);
        });
    });



});
