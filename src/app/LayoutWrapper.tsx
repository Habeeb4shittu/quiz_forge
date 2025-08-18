"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import { Toaster } from "sonner";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    return (
        <div
            className={
                isAuthPage
                    ? "flex items-center justify-center min-h-screen"
                    : "grid md:grid-cols-[1fr_3fr] min-h-screen"
            }
        >
            {!isAuthPage && <Sidebar />}
            <main className="w-full">
                {children}
                <Toaster richColors position="top-right" />
            </main>
        </div>
    );
}
