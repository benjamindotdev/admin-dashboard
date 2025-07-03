// external imports
import { ReactNode } from 'react';

// internal imports
import ActionButtons from '@/components/common/ActionButtons';

interface AdminCardLargeProps {
    title?: string;
    data: Record<string, string | number | ReactNode>[];
}

export default function AdminCardLarge({ title, data }: AdminCardLargeProps) {
    if (data.length === 0) {
        return (
            <div className='flex flex-col gap-6 bg-white p-6 rounded-sm border border-gray-200'>
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    const keys = Array.from(new Set(data.flatMap(item => Object.keys(item))));

    return (
        <div className='flex flex-col gap-6 bg-white p-6 rounded-sm border border-gray-200 max-w-full'>
            {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
            <div className="overflow-x-auto w-full">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="border-b-2 border-white">
                            {keys.map((key) => (
                                <th key={key} className="text-left py-3 px-3 font-semibold text-gray-700 capitalize bg-white border-r border-white last:border-r-0 whitespace-nowrap">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className={`border-b border-white  ${index === data.length - 1 ? 'border-b-0' : ''}`}>
                                {keys.map((key) => (
                                    <td key={key} className="py-3 px-3 text-gray-800 border-r border-white last:border-r-0 whitespace-nowrap">
                                        {key.toLowerCase() === 'actions' ? (
                                            <ActionButtons />
                                        ) : typeof item[key] === 'object' && item[key] !== null ?
                                            item[key] :
                                            (item[key] || '-')
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}