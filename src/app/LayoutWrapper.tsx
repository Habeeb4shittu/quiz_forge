"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import { Toaster } from "sonner";
import PeakGreeting from "./components/Greeting";
import { useEffect, useState } from "react";
import { QuizUser } from "@/lib/types";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [user, setUser] = useState<QuizUser>({
        _id: "",
        firstname: "",
        lastname: "",
        username: "",
        email: ""
    });

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const isAuthPage = pathname === "/login" || pathname === "/signup";

    return (
        <main
            className={`
                ${isAuthPage
                    ? "flex items-center justify-center min-h-screen"
                    : "grid md:grid-cols-[1fr_4fr] min-h-screen"} overflow-hidden`
            }
        >
            {!isAuthPage && <Sidebar />}
            <section className={`w-full max-h-screen overflow-y-auto ${isAuthPage ? "" : "px-0 sm:px-4 md:px-8 lg:px-12"}`}>
                {!isAuthPage && (
                    <PeakGreeting username={user.username} />
                )}
                {children}
                <Toaster richColors position="top-right" />
            </section>
        </main>
    );
}
