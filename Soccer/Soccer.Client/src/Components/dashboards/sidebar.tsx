import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Trophy, MessageSquare, ShieldAlert, Home, Menu, X } from "lucide-react";
import { User as UserIcon } from "lucide-react";
import {useAuth} from "../../Hooks/useAuth.tsx";

export default function DashboardSidebar() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {user} = useAuth();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const menuItems = [
        {
            title: "Dashboard",
            href: "/",
            icon: Home,
        },
        {
            title: "My Profile",
            href: "/profile",
            icon: UserIcon,
        },
        {
            title: "My Teams",
            href: "/teams",
            icon: Users,
        },
        {
            title: "My Competitions",
            href: "/competitions",
            icon: Trophy,
        },
        {
            title: "My Posts / Feed",
            href: "/feed",
            icon: MessageSquare,
        },
    ];

    if (user?.roles.includes("Admin")) {
        menuItems.push({
            title: "Admin Panel",
            href: "/admin",
            icon: ShieldAlert,
        });
    }

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-40 p-2 bg-white rounded-md shadow-md md:hidden"
                aria-label="Toggle menu"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className={`w-64 min-h-screen bg-white border-r fixed md:static z-30 transform transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}>
                <div className="p-4 pt-16 md:pt-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            const IconComponent = item.icon;

                            return (
                                <li key={item.href}>
                                    <Link
                                        to={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                                            isActive ? "bg-purple-100 text-purple-700 font-medium" : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                        onClick={() => {
                                            if (window.innerWidth < 768) {
                                                setIsSidebarOpen(false);
                                            }
                                        }}
                                    >
                                        <IconComponent className="h-5 w-5" />
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-transparent bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </>
    );
}