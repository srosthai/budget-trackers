'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

// =====================================================
// DASHBOARD LAYOUT
// 
// Main layout wrapper for authenticated pages
// Features: Sidebar + Header + Main content area
// =====================================================

interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

export function DashboardLayout({
    children,
    title,
    subtitle,
}: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                {/* Sidebar */}
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
                    {/* Header */}
                    <Header
                        onMenuClick={() => setSidebarOpen(true)}
                        title={title}
                        subtitle={subtitle}
                    />

                    {/* Page Content */}
                    <main className="flex-1 p-4 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
