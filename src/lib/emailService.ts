// internal imports
import { EmailTemplate } from '@/types';
import { mockEmailTemplates, mockUsers } from '@/lib/mockData';

const BREVO_API_URL = 'https://api.brevo.com/v3';
const BREVO_API_KEY = process.env.BREVO_API_KEY;

interface BrevoEmailRequest {
    sender: {
        name: string;
        email: string;
    };
    to: Array<{
        name: string;
        email: string;
    }>;
    subject: string;
    htmlContent: string;
}

async function sendBrevoEmail(emailData: BrevoEmailRequest): Promise<boolean> {
    try {
        if (!BREVO_API_KEY) {
            console.warn('⚠️ BREVO_API_KEY not found. Email sending simulated.');
            console.log('📧 Simulated email send:');
            console.log('To:', emailData.to[0].email);
            console.log('Subject:', emailData.subject);
            console.log('Content preview:', emailData.htmlContent.substring(0, 100) + '...');
            return true;
        }

        const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': BREVO_API_KEY
            },
            body: JSON.stringify(emailData)
        });

        if (response.ok) {
            console.log('✅ Email sent successfully via Brevo API');
            const result = await response.json();
            console.log('📧 Email ID:', result.messageId);
            console.log('📧 Check your inbox (including spam folder) for:', emailData.to[0].email);
            return true;
        } else {
            const error = await response.text();
            console.error('❌ Brevo API Error:', response.status, error);
            console.error('❌ Full response:', error);
            return false;
        }
    } catch (error) {
        console.error('❌ Failed to send email:', error);
        return false;
    }
}

function renderTemplate(template: EmailTemplate, variables: Record<string, string>): string {
    let renderedContent = template.htmlContent;

    template.variables.forEach(variable => {
        const value = variables[variable] || `[${variable}]`;
        const placeholder = `\\{\\{${variable}\\}\\}`;
        renderedContent = renderedContent.replace(new RegExp(placeholder, 'g'), value);
    });

    return renderedContent;
}

function renderSubject(template: EmailTemplate, variables: Record<string, string>): string {
    let renderedSubject = template.subject;

    template.variables.forEach(variable => {
        const value = variables[variable] || `[${variable}]`;
        const placeholder = `\\{\\{${variable}\\}\\}`;
        renderedSubject = renderedSubject.replace(new RegExp(placeholder, 'g'), value);
    });

    return renderedSubject;
}

export async function sendSellerApprovalEmail(sellerId: string): Promise<boolean> {
    const seller = mockUsers.find(u => u.id === sellerId);
    if (!seller) return false;

    const template = mockEmailTemplates.find(t => t.id === 'seller-approval');
    if (!template) return false;

    const variables = {
        sellerName: seller.name,
        badgeLevel: seller.badgeLevel || 'Standard',
        dashboardUrl: 'https://trendies-omega.vercel.app/admin/dashboard'
    };

    const emailData: BrevoEmailRequest = {
        sender: {
            name: 'Trendies Morocco',
            email: 'contact@trendiesmaroc.com'
        },
        to: [{
            name: seller.name,
            email: seller.email
        }],
        subject: renderSubject(template, variables),
        htmlContent: renderTemplate(template, variables)
    };

    return await sendBrevoEmail(emailData);
}

export async function sendOrderConfirmationEmail(
    orderId: string,
    buyerEmail: string,
    productName: string,
    sellerName: string,
    amount: number
): Promise<boolean> {
    const template = mockEmailTemplates.find(t => t.id === 'order-confirmation');
    if (!template) return false;

    const variables = {
        buyerName: buyerEmail.split('@')[0],
        productName,
        orderId,
        amount: amount.toString(),
        sellerName
    };

    const emailData: BrevoEmailRequest = {
        sender: {
            name: 'Trendies Morocco',
            email: 'contact@trendiesmaroc.com'
        },
        to: [{
            name: variables.buyerName,
            email: buyerEmail
        }],
        subject: renderSubject(template, variables),
        htmlContent: renderTemplate(template, variables)
    };

    return await sendBrevoEmail(emailData);
}

export async function sendReturnAcceptedEmail(
    buyerEmail: string,
    productName: string,
    returnId: string
): Promise<boolean> {
    const template = mockEmailTemplates.find(t => t.id === 'return-accepted');
    if (!template) return false;

    const variables = {
        buyerName: buyerEmail.split('@')[0],
        productName,
        returnId
    };

    const emailData: BrevoEmailRequest = {
        sender: {
            name: 'Trendies Morocco',
            email: 'contact@trendiesmaroc.com'
        },
        to: [{
            name: variables.buyerName,
            email: buyerEmail
        }],
        subject: renderSubject(template, variables),
        htmlContent: renderTemplate(template, variables)
    };

    return await sendBrevoEmail(emailData);
}
