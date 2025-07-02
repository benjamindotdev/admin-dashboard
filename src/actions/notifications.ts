'use server'

import { NotificationEvent, EventData } from '@/types';
import { processNotificationEvent as processNotificationEventService } from '@/lib/notificationService';

export async function processNotificationEvent(eventData: EventData): Promise<void> {
    try {
        await processNotificationEventService(eventData);
    } catch (error) {
        console.error('Error processing notification event:', error);
        throw new Error('Failed to process notification event');
    }
}

export async function triggerEvent(event: NotificationEvent, data: Record<string, unknown>): Promise<void> {
    await processNotificationEvent({ event, data });
}
