'use client';

import { Icons } from '../ui/Icons';
import { Button } from '../ui/Button';

// =====================================================
// HEADER COMPONENT
// 
// Top header with search, notifications, and user actions
// Features: Mobile menu toggle, search bar, quick actions
// =====================================================

interface HeaderProps {
    onMenuClick: () => void;
    title?: string;
    subtitle?: string;
}

export function Header({ onMenuClick, title = 'Dashboard', subtitle }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="flex items-center justify-between h-16 px-4 lg:px-6">
                {/* Left Side */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-background-tertiary transition-colors"
                        aria-label="Open menu"
                    >
                        <Icons.Menu className="w-6 h-6 text-foreground" />
                    </button>

                    {/* Page Title */}
                    <div>
                        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
                        {subtitle && (
                            <p className="text-sm text-foreground-muted">{subtitle}</p>
                        )}
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2 lg:gap-4">
                    {/* Search Bar (Hidden on mobile) */}
                    <div className="hidden md:flex items-center relative">
                        <Icons.Search className="absolute left-3 w-4 h-4 text-foreground-muted" />
                        <input
                            type="search"
                            placeholder="Search transactions..."
                            className="
                w-64 h-9 pl-10 pr-4
                bg-background-tertiary text-foreground
                placeholder:text-foreground-subtle
                border border-transparent
                rounded-lg text-sm
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                transition-all duration-200
              "
                            aria-label="Search transactions"
                        />
                    </div>

                    {/* Search Button (Mobile only) */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-background-tertiary transition-colors"
                        aria-label="Search"
                    >
                        <Icons.Search className="w-5 h-5 text-foreground-muted" />
                    </button>

                    {/* Notifications */}
                    <button
                        className="relative p-2 rounded-lg hover:bg-background-tertiary transition-colors"
                        aria-label="Notifications"
                    >
                        <Icons.Bell className="w-5 h-5 text-foreground-muted" />
                        {/* Notification Badge */}
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-expense rounded-full" />
                    </button>

                    {/* Add Transaction Button */}
                    <Button
                        size="sm"
                        className="hidden sm:flex"
                        icon={<Icons.Plus className="w-4 h-4" />}
                    >
                        Add Transaction
                    </Button>

                    {/* Mobile Add Button */}
                    <Button
                        size="sm"
                        className="sm:hidden !px-2"
                        aria-label="Add transaction"
                    >
                        <Icons.Plus className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
