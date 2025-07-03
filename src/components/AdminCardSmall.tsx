import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons-react";

export default function AdminCardSmall({ title, value, footer, direction }: {
    title: string;
    value: string | number;
    footer: string;
    direction: 'up' | 'down';
}) {
    return (
        <div className="bg-white p-4 rounded-sm border-1 border-gray-200 flex flex-col gap-2">
            <h3 className="text-lg ld text-gray-800">{title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className="text-sm text-gray-400 flex items-start">{direction === 'up' ? (
                <IconArrowNarrowUp className="text-xs" />
            ) : (
                <IconArrowNarrowDown className="text-xs" />
            )} {footer}</p>

        </div>
    );
}