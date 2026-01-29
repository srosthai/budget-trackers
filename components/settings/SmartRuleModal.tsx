// =====================================================
// SMART RULE MODAL
// 
// Add/Edit smart rule form
// =====================================================

'use client';

import { useState, useEffect, useRef } from 'react';
import { Icons } from '@/components/ui';
import { SmartRule } from '@/hooks/useSmartRules';
import { Category } from '@/hooks/useCategories';

interface SmartRuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (pattern: string, categoryId: string) => Promise<boolean>;
    categories: Category[];
    initialData?: SmartRule;
}

export function SmartRuleModal({ isOpen, onClose, onSave, categories, initialData }: SmartRuleModalProps) {
    const [pattern, setPattern] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initialData) {
            setPattern(initialData.pattern);
            setCategoryId(initialData.categoryId);
        } else {
            setPattern('');
            setCategoryId('');
        }
        setIsSelectOpen(false); // Reset dropdown when opening/switching
    }, [initialData, isOpen]);

    // Click outside to close (optional but good UI)
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsSelectOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pattern.trim() || !categoryId) return;

        setIsSubmitting(true);
        const success = await onSave(pattern, categoryId);
        setIsSubmitting(false);

        if (success) onClose();
    };

    const selectedCategory = categories.find(c => c.categoryId === categoryId);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#0a0f0a] border border-[#1a2f1a] rounded-2xl p-6 shadow-2xl animate-scale-up">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {initialData ? 'Edit Rule' : 'New Smart Rule'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <Icons.X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Pattern Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">If vendor contains...</label>
                        <input
                            type="text"
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            placeholder="e.g. Starbucks"
                            className="w-full h-12 px-4 bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl text-white focus:border-[#22c55e] focus:outline-none"
                            autoFocus
                        />
                        <p className="text-xs text-gray-600 mt-1">This will auto-match transactions with this text.</p>
                    </div>

                    {/* Category Custom Select */}
                    <div className="relative" ref={dropdownRef}>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Set Category To</label>
                        <button
                            type="button"
                            onClick={() => setIsSelectOpen(!isSelectOpen)}
                            className={`w-full h-12 px-4 bg-[#1a2a1a] border rounded-xl flex items-center justify-between transition-colors ${isSelectOpen ? 'border-[#22c55e]' : 'border-[#2a3f2a]'
                                }`}
                        >
                            <span className={selectedCategory ? 'text-white' : 'text-gray-500'}>
                                {selectedCategory ? selectedCategory.name : 'Select Category'}
                            </span>
                            <Icons.ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isSelectOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 z-50 max-h-60 overflow-y-auto bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl shadow-xl scrollbar-thin scrollbar-thumb-gray-700">
                                {categories.length > 0 ? categories.map((cat) => (
                                    <button
                                        key={cat.categoryId}
                                        type="button"
                                        onClick={() => {
                                            setCategoryId(cat.categoryId);
                                            setIsSelectOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#22c55e]/10 transition-colors ${categoryId === cat.categoryId ? 'text-[#22c55e] bg-[#22c55e]/5' : 'text-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: cat.color || '#gray-500' }}
                                            />
                                            <span className="text-sm font-medium">{cat.name}</span>
                                        </div>
                                        {categoryId === cat.categoryId && <Icons.Check className="w-4 h-4" />} {/* Add Check Icon later if needed, assuming generic tick */}
                                    </button>
                                )) : (
                                    <div className="p-4 text-center text-sm text-gray-500">No categories found</div>
                                )}
                            </div>
                        )}

                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-12 rounded-xl border border-[#2a3f2a] text-gray-400 hover:text-white font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !pattern.trim() || !categoryId}
                            className="flex-1 h-12 rounded-xl bg-[#22c55e] text-[#0a0f0a] font-bold hover:bg-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Rule'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
