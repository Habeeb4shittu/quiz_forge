"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/images/logo.png";
import { useEffect, useState } from "react";
import { logout } from "@/lib/api/auth";
import { toast } from "sonner";
import {
    LayoutDashboard,
    Plus,
    Search,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    Sparkles
} from "lucide-react";
import { QuizUser } from "@/lib/types";

export default function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

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

    if (pathname === "/login" || pathname === "/signup") {
        return null;
    }
    const handleLogout = async () => {
        await logout();
        toast.success("Logout Successful");
        window.location.href = '/login';
    };

    const links = [
        {
            href: "/",
            label: "Dashboard",
            active: pathname === "/",
            icon: <LayoutDashboard className="w-5 h-5" />
        },
        {
            href: "/create",
            label: "Create Quiz",
            active: pathname === "/create",
            icon: <Plus className="w-5 h-5" />
        },
        {
            href: "/about",
            label: "Browse Quizzes",
            active: pathname === "/about",
            icon: <Search className="w-5 h-5" />
        },
        {
            href: "/my-quizzes",
            label: "My Quizzes",
            active: pathname === "/my-quizzes",
            icon: <FileText className="w-5 h-5" />
        },
        {
            href: "/settings",
            label: "Settings",
            active: pathname === "/settings",
            icon: <Settings className="w-5 h-5" />
        },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="fixed top-4 left-4 z-50 md:hidden bg-slate-900 hover:bg-slate-800 p-3 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105"
                onClick={() => setOpen(!open)}
                aria-label="Toggle sidebar"
            >
                <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-white/95 backdrop-blur-xl border-r border-slate-200/60 shadow-2xl z-50 transition-all duration-500 ease-out
                    ${open ? "translate-x-0" : "-translate-x-full"} 
                    md:translate-x-0 md:static md:block w-72`}
            >
                {/* Header */}
                <div className="relative">
                    {/* Close button for mobile */}
                    <button
                        className="absolute top-4 right-4 md:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-300"
                        onClick={() => setOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Logo and Brand */}
                    <div className="p-6 border-b border-slate-200/60">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-12 h-12 bg-violet-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">QuizForge</h1>
                                <p className="text-sm text-slate-500">Create & Learn</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-6 overflow-y-auto">
                    <div className="space-y-2">
                        {links.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`group flex items-center px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${link.active
                                    ? "bg-violet-500 text-white shadow-lg shadow-violet-200 transform scale-105"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:transform hover:translate-x-1"
                                    }`}
                                onClick={() => setOpen(false)}
                                style={{
                                    animationDelay: `${index * 50}ms`
                                }}
                            >
                                <div className={`mr-3 transition-all duration-300 ${link.active
                                    ? "text-white"
                                    : "text-slate-500 group-hover:text-violet-500 group-hover:scale-110"
                                    }`}>
                                    {link.icon}
                                </div>
                                <span className="text-sm font-semibold">{link.label}</span>
                                {link.active && (
                                    <div className="ml-auto">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-200/60 bg-white/80 backdrop-blur-md">
                    <button
                        className="group flex items-center w-full px-4 py-3 rounded-2xl font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300 hover:transform hover:translate-x-1 cursor-pointer"
                        onClick={handleLogout}
                    >
                        <div className="mr-3 text-slate-500 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300">
                            <LogOut className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-semibold">Logout</span>
                    </button>

                    {/* User Profile Preview */}
                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">{user?.firstname[0] || "U"}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900 truncate">{(user?.firstname + " " + user?.lastname) || "Name"}</p>
                                <p className="text-xs text-slate-500 truncate">{user?.email || "user@example.com"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
}