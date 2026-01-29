// =====================================================
// CUSTOM SELECT COMPONENT
// 
// Styled dropdown replacing native <select>
// =====================================================

'use client';

import { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';

interface Option {
    value: string;
    label: string;
    icon?: keyof typeof Icons;
    color?: string;
}

interface SelectProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export function Select({ label, value, onChange, options, placeholder = 'Select...', className = '', disabled = false }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {label && <label className={`block text-sm font-medium mb-1 ${disabled ? 'text-gray-600' : 'text-gray-400'}`}>{label}</label>}

            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full h-11 sm:h-12 px-4 bg-[#1a2a1a] border rounded-xl flex items-center justify-between transition-colors ${
                    disabled
                        ? 'border-[#1a2f1a] opacity-50 cursor-not-allowed'
                        : isOpen
                            ? 'border-[#22c55e]'
                            : 'border-[#2a3f2a]'
                }`}
            >
                <span className={selectedOption ? 'text-white' : 'text-gray-500'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <Icons.ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && !disabled && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 max-h-48 sm:max-h-60 overflow-y-auto overscroll-contain bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl shadow-xl scrollbar-thin scrollbar-thumb-gray-700">
                    {options.length > 0 ? options.map((opt) => {
                        const Icon = opt.icon ? Icons[opt.icon] : null;
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2.5 sm:py-3 text-left hover:bg-[#22c55e]/10 transition-colors ${value === opt.value ? 'text-[#22c55e] bg-[#22c55e]/5' : 'text-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {opt.color && (
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.color }} />
                                    )}
                                    {Icon && <Icon className="w-4 h-4" />}
                                    <span className="text-sm font-medium">{opt.label}</span>
                                </div>
                                {value === opt.value && <Icons.Check className="w-4 h-4" />}
                            </button>
                        );
                    }) : (
                        <div className="p-4 text-center text-sm text-gray-500">No options found</div>
                    )}
                </div>
            )}
        </div>
    );
}
