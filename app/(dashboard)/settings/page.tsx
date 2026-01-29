'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Icons } from '@/components/ui';
import { BottomNavigation } from '@/components/dashboard';

// =====================================================
// SETTINGS MENU PAGE
// 
// Main hub for:
// - Categories & Rules
// - Account Settings
// - App Preferences
// =====================================================

export default function SettingsPage() {
    const router = useRouter();
    const { data: session } = useSession();

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' });
    };

    const userName = session?.user?.name || 'User';
    const userEmail = session?.user?.email || 'user@example.com';
    const userImage = session?.user?.image;
    const initials = userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="min-h-screen bg-[#0a0f0a] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sticky top-0 bg-[#0a0f0a] z-10">
                <h1 className="text-xl font-bold text-white">Settings</h1>
            </div>

            <div className="flex-1 px-4 py-2 overflow-y-auto pb-24 max-w-2xl mx-auto w-full">
                {/* Profile Card */}
                <div className="flex items-center gap-4 p-4 bg-[#1a2a1a] rounded-2xl mb-6 border border-[#2a3f2a]">
                    {userImage ? (
                        <img src={userImage} alt={userName} className="w-14 h-14 rounded-full object-cover" />
                    ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center text-white text-xl font-bold">
                            {initials}
                        </div>
                    )}

                    <div>
                        <h2 className="text-lg font-bold text-white">{userName}</h2>
                        <p className="text-sm text-gray-400">{userEmail}</p>
                    </div>
                </div>

                {/* General Settings */}
                <div className="space-y-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">General</p>

                    <Link href="/settings/categories" className="flex items-center gap-4 p-4 bg-[#1a2a1a]/50 rounded-xl hover:bg-[#1a2a1a] transition-colors border border-transparent hover:border-[#2a3f2a]">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                            <Icons.Tag className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-white">Categories & Rules</p>
                            <p className="text-xs text-gray-500">Manage spending categories</p>
                        </div>
                        <Icons.ChevronRight className="w-5 h-5 text-gray-600" />
                    </Link>

                    <Link href="/accounts" className="flex items-center gap-4 p-4 bg-[#1a2a1a]/50 rounded-xl hover:bg-[#1a2a1a] transition-colors border border-transparent hover:border-[#2a3f2a]">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                            <Icons.Wallet className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-white">Accounts</p>
                            <p className="text-xs text-gray-500">Manage wallets & banks</p>
                        </div>
                        <Icons.ChevronRight className="w-5 h-5 text-gray-600" />
                    </Link>
                </div>

                {/* App Settings */}
                <div className="space-y-4 mt-8">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">App</p>

                    <button className="w-full flex items-center gap-4 p-4 bg-[#1a2a1a]/50 rounded-xl hover:bg-[#1a2a1a] transition-colors text-left border border-transparent hover:border-[#2a3f2a]">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-500">
                            <Icons.Bell className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-white">Notifications</p>
                            <p className="text-xs text-gray-500">Reminders & updates</p>
                        </div>
                        <Icons.ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 p-4 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-colors text-left mt-4 border border-red-500/20 hover:border-red-500/40"
                    >
                        <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500">
                            <Icons.Logout className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-red-500">Log Out</p>
                        </div>
                    </button>
                </div>
            </div>

            <div className="lg:hidden">
                <BottomNavigation />
            </div>
        </div>
    );
}
