"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/images/logo.png";
import { useState } from "react";
import { logout } from "@/lib/api/auth";
import { toast } from "sonner";

export default function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    if (pathname === "/login" || pathname === "/signup") {
        return null;
    }

    const handleLogout = async () => {
        const response = await logout();

        toast.success("Logout Successful")
        window.location.href = '/login';
    };

    const links = [
        {
            href: "/",
            label: "Dashboard",
            active: pathname === "/",
            icon: <svg viewBox="-0.32 -0.32 16.64 16.64" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0000000" strokeWidth="1.152"><path fillRule="evenodd" clipRule="evenodd" d="M7 1H1V7H7V1ZM7 9H1V15H7V9ZM9 1H15V7H9V1ZM15 9H9V15H15V9Z" fill="#ffffff"></path></svg>
        },
        {
            href: "/create",
            label: "Create Quiz",
            active: pathname === "/create",
            icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#ffffff" strokeWidth="1.56" strokeLinecap="round"></path><path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#ffffff" strokeWidth="1.56" strokeLinecap="round"></path></svg>
        },
        {
            href: "/about",
            label: "Browse Quizzes",
            active: pathname === "/about",
            icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        },
        {
            href: "/contact",
            label: "My Quizzes",
            active: pathname === "/contact",
            icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.93 6.76001L18.56 20.29C18.32 21.3 17.42 22 16.38 22H3.24001C1.73001 22 0.650023 20.5199 1.10002 19.0699L5.31001 5.55005C5.60001 4.61005 6.47003 3.95996 7.45003 3.95996H19.75C20.7 3.95996 21.49 4.53997 21.82 5.33997C22.01 5.76997 22.05 6.26001 21.93 6.76001Z" stroke="#ffffff" strokeWidth="1.584" strokeMiterlimit="10"></path><path d="M16 22H20.78C22.07 22 23.08 20.91 22.99 19.62L22 6" stroke="#ffffff" strokeWidth="1.584" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.67999 6.38L10.72 2.06006" stroke="#ffffff" strokeWidth="1.584" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.38 6.39001L17.32 2.05005" stroke="#ffffff" strokeWidth="1.584" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.70001 12H15.7" stroke="#ffffff" strokeWidth="1.584" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.70001 16H14.7" stroke="#ffffff" strokeWidth="1.584" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        },
        {
            href: "/settings",
            label: "Settings",
            active: pathname === "/settings",
            icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z" fill="#ffffff"></path></svg>
        },
    ];

    return (
        <>
            {/* Mobile Hamburger */}
            <button
                className="fixed bottom-4 right-4 z-40 cursor-pointer md:hidden bg-indigo-900 p-2 rounded-full"
                onClick={() => setOpen(!open)}
                aria-label="Open sidebar"
            >
                <svg width="28" height="28" fill="none" stroke="#fff" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-gradient-to-tl from-indigo-900 via-purple-900 to-pink-900 text-white p-4 z-50 transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
                style={{ maxWidth: "100vw" }}
            >
                {/* Close button for mobile */}
                <div className="flex md:hidden justify-end mb-0.5">
                    <button
                        className="text-white p-1 cursor-pointer rounded-full hover:bg-red-700 transition-colors duration-300"
                        onClick={() => setOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <svg width="24" height="24" fill="none" stroke="#fff" viewBox="0 0 24 24">
                            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center justify-center mb-10">
                    <Image src={Logo} alt="Logo" width={60} className="rounded-full" />
                    <h1 className="text-2xl font-bold ml-2 font-mono text-[#0b1121]">QuizForge</h1>
                </div>
                <ul className="space-y-2">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`flex items-center p-2 rounded-lg transition-colors duration-700 ${link.active
                                    ? "bg-gradient-to-r from-indigo-800 via-purple-800 "
                                    : "hover:bg-indigo-500"
                                    }`}
                                onClick={() => setOpen(false)}
                            >
                                <div className="w-6 mr-3">{link.icon}</div>
                                <span className="font-medium text-md">{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="absolute bottom-4 left-0 w-full px-4">
                    <button
                        className="flex items-center w-full p-2 rounded-lg cursor-pointer transition-colors duration-700"
                        onClick={handleLogout}
                    >
                        <div className="w-6 mr-3">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 17L21 12L16 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 12H9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 19C7.58172 19 4 15.4183 4 11C4 6.58172 7.58172 3 12 3" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="font-medium text-md">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {open && (
                <div
                    className="fixed inset-0 bg-[#00000034] z-30 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
}