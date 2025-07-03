export default function PageContainer({ children, pageTitle }: { children: React.ReactNode, pageTitle: string }) {
    return (
        <main className="min-h-screen bg-gray-100 flex flex-col items-start gap-6 p-6 w-[100%]">
            <h1 className="text-3xl font-semibold text-black pt-10">{pageTitle}</h1>
            {children}
        </main>
    );
}
