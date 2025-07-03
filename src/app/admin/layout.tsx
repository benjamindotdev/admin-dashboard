// internal imports
import { MainLayout } from '@/components/layout/MainLayout';
import { Navbar } from '@/components/layout/Navbar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className='flex min-h-screen bg-white flex-col w-3/4 mx-auto'>
        <Navbar />
        <MainLayout>{children}</MainLayout>
    </div>;
}
