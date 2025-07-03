'use client'

// external imports
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Sidebar() {
    const pathname = usePathname();

    const sidebarItems = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Users', href: '/admin/users' },
        { label: 'Orders', href: '/admin/orders' },
    ];
    return (
        <div className="w-[300px] min-w-[300px] p-4  bg-white gap-4">
            <nav className="flex flex-col gap-2 p-4 pt-12">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-xs transition-colors text-black text-[16px] ${isActive
                                ? 'bg-gray-200 '
                                : ' hover:bg-gray-200'
                                }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}