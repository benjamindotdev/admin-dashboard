// internal imports
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <MainContent>{children}</MainContent>
        </div>
    );
}