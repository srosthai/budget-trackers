'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Icons } from '@/components/ui';
import { useLanguage } from '@/components/providers';

const navItems = [
    { key: 'nav.home', href: '/dashboard', icon: 'Home' },
    { key: 'nav.insights', href: '/transactions', icon: 'ChartBar' },
    { key: 'nav.categories', href: '/categories', icon: 'Tag' },
    { key: 'nav.profile', href: '/profile', icon: 'User' },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { t } = useLanguage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const userName = session?.user?.name || 'User';
    const userImage = session?.user?.image;
    const initials = userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="min-h-screen bg-[#0a0f0a]">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col bg-[#0a0f0a] border-r border-[#1a2f1a] z-50">
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 h-16 border-b border-[#1a2f1a]">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center">
                        <Icons.BankNotes className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">I-Tracker</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => {
                        const Icon = Icons[item.icon as keyof typeof Icons];
                        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                                    isActive
                                        ? 'bg-[#22c55e]/10 text-[#22c55e]'
                                        : 'text-gray-400 hover:bg-[#1a2a1a] hover:text-white'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {t(item.key)}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="px-4 py-4 border-t border-[#1a2f1a]">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1a2a1a]">
                        {userImage ? (
                            <img
                                src={userImage}
                                alt={userName}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center text-white font-medium">
                                {initials}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{userName}</p>
                            <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:pl-64">
                {children}
            </main>
        </div>
    );
}
