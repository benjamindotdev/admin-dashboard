'use client';

interface AdminCardMediumProps {
    title: string;
    children: React.ReactNode;
}

export default function AdminCardMedium({ title, children }: AdminCardMediumProps) {
    return (
        <div className='flex flex-col gap-6 bg-white p-6 rounded-sm border border-gray-200'>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {children}
        </div>
    );
}
