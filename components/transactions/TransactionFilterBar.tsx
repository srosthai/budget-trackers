// =====================================================
// TRANSACTION FILTER BAR
// 
// Search + Dropdown Filters (Category, Type, Date)
// Using Custom Dropdowns matching Select component style
// Forced Refresh for Hydration Fix
// =====================================================

'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icons } from '@/components/ui';

interface CategoryOption {
    id: string;
    name: string;
}

interface FilterBarProps {
    search: string;
    onSearchChange: (val: string) => void;
    filters: {
        type?: string;
        categoryId?: string;
        startDate?: string;
        endDate?: string;
    };
    onFilterChange: (key: string, value: string | undefined) => void;
    categories: CategoryOption[];
}

interface Option {
    value: string;
    label: string;
}

function FilterDropdown({
    label,
    value,
    options,
    onChange,
    className = ''
}: {
    label: string;
    value?: string;
    options: Option[];
    onChange: (val: string | undefined) => void;
    className?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const selectedOption = options.find(opt => opt.value === value);
    const isActive = !!value;

    // Click outside to close (modified for Portal)
    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(event: MouseEvent) {
            // Check if click is on button
            if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
                return;
            }
            // Check if click is inside dropdown (we need a ref for the dropdown content if possible, 
            // but since it's portal, we can check if target is NOT closest .portal-dropdown)
            const target = event.target as Element;
            if (!target.closest('.portal-dropdown')) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Handle Window Resize / Scroll to close or update position (Simple: close)
    useEffect(() => {
        const handleScroll = () => { if (isOpen) setIsOpen(false); };
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleScroll);
        }
    }, [isOpen]);

    const handleToggle = () => {
        if (!isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + 8,
                left: rect.left,
                width: Math.max(rect.width, 200) // Min width for dropdown
            });
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    return (
        <div className={`relative shrink-0 ${className}`}>
            <button
                ref={buttonRef}
                type="button"
                onClick={handleToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-colors whitespace-nowrap ${isActive
                        ? 'bg-[#22c55e]/10 border-[#22c55e] text-[#22c55e]'
                        : 'bg-[#1a2a1a] border-[#2a3f2a] text-gray-300 hover:border-gray-500'
                    }`}
            >
                <span className="max-w-[120px] truncate">
                    {selectedOption ? selectedOption.label : label}
                </span>
                <Icons.ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''} ${isActive ? 'text-[#22c55e]' : 'text-gray-500'
                    }`} />
            </button>

            {/* Portal Dropdown Menu */}
            {isOpen && typeof document !== 'undefined' && createPortal(
                <div
                    className="portal-dropdown fixed z-[9999] bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl shadow-xl scrollbar-thin scrollbar-thumb-gray-700 animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto"
                    style={{
                        top: coords.top,
                        left: coords.left,
                        minWidth: '200px'
                    }}
                >
                    <div className="p-1">
                        <button
                            type="button"
                            onClick={() => {
                                onChange(undefined);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center px-3 py-2 text-left rounded-lg hover:bg-[#22c55e]/10 transition-colors ${!value ? 'text-[#22c55e]' : 'text-gray-400'}`}
                        >
                            <span className="text-sm">All {label}s</span>
                        </button>

                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg hover:bg-[#22c55e]/10 transition-colors ${value === opt.value ? 'text-[#22c55e] bg-[#22c55e]/5' : 'text-gray-300'
                                    }`}
                            >
                                <span className="text-sm truncate">{opt.label}</span>
                                {value === opt.value && <Icons.Check className="w-3 h-3 ml-2 shrink-0" />}
                            </button>
                        ))}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

export function TransactionFilterBar({
    search,
    onSearchChange,
    filters,
    onFilterChange,
    categories
}: FilterBarProps) {
    return (
        <div className="space-y-4 px-4 py-2 sticky top-14 bg-[#0a0f0a] z-10 pb-4 border-b border-[#1a2f1a]">
            {/* Search Bar */}
            <div className="relative">
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search transactions"
                    className="w-full h-11 pl-10 pr-4 bg-[#1a2a1a] text-white rounded-xl border border-[#2a3f2a] focus:border-[#22c55e] focus:outline-none placeholder:text-gray-500 text-sm transition-all shadow-inner"
                />
            </div>

            {/* Filter Chips - Scrollable Row */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 min-h-[42px]">
                {/* Type Filter */}
                <FilterDropdown
                    label="Type"
                    value={filters.type}
                    onChange={(val) => onFilterChange('type', val)}
                    options={[
                        { value: 'income', label: 'Income' },
                        { value: 'expense', label: 'Expense' }
                    ]}
                />

                {/* Category Filter */}
                <FilterDropdown
                    label="Category"
                    value={filters.categoryId}
                    onChange={(val) => onFilterChange('categoryId', val)}
                    options={categories.map(c => ({ value: c.id, label: c.name }))}
                />

                {/* Date Filter - Native fallback with style match */}
                <div className="relative shrink-0">
                    <input
                        type="date"
                        value={filters.startDate || ''}
                        onChange={(e) => onFilterChange('startDate', e.target.value || undefined)}
                        className={`appearance-none pl-4 pr-2 py-2 rounded-full border text-sm focus:outline-none transition-colors h-[38px] ${filters.startDate
                            ? 'bg-[#22c55e]/10 border-[#22c55e] text-[#22c55e]'
                            : 'bg-[#1a2a1a] border-[#2a3f2a] text-gray-300 hover:border-gray-500'
                            } [color-scheme:dark]`}
                    />
                </div>
            </div>
        </div>
    );
}
