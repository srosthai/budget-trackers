// =====================================================
// CATEGORY MODAL
// 
// Add/Edit category form
// =====================================================

'use client';

import { useState, useEffect } from 'react';
import { Icons, Select } from '@/components/ui';
import { Category } from '@/hooks/useCategories';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<Category>) => Promise<boolean>;
    categories: Category[]; // List of existing categories to choose parent from
    initialData?: Category;
    type?: 'expense' | 'income';
}

export function CategoryModal({ isOpen, onClose, onSave, categories, initialData, type = 'expense' }: CategoryModalProps) {
    const [name, setName] = useState('');
    const [selectedType, setSelectedType] = useState<'expense' | 'income'>(type);
    const [parentCategoryId, setParentCategoryId] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setSelectedType(initialData.type);
            setParentCategoryId(initialData.parentCategoryId || '');
        } else {
            setName('');
            setSelectedType(type);
            setParentCategoryId('');
        }
    }, [initialData, type, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        const success = await onSave({
            name,
            type: selectedType,
            parentCategoryId: parentCategoryId || undefined // Send undefined if empty
        });
        setIsSubmitting(false);

        if (success) onClose();
    };

    // Filter potential parents:
    // 1. Must be same type
    // 2. Must not be itself (if editing)
    // 3. Must not be a child of itself (circular - hard to check deeply, but basic check)
    const potentialParents = categories.filter(c =>
        c.type === selectedType &&
        c.categoryId !== initialData?.categoryId &&
        !c.parentCategoryId // Only allow nesting under top-level items for now (max depth 2)
    ).map(c => ({
        value: c.categoryId,
        label: c.name,
        color: c.color
    }));

    // Add "None" option
    const parentOptions = [
        { value: '', label: 'None (Top Level)', color: undefined },
        ...potentialParents
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#0a0f0a] border border-[#1a2f1a] rounded-2xl p-6 shadow-2xl animate-scale-up">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {initialData ? 'Edit Category' : 'New Category'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <Icons.X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Type Selection */}
                    <div className="flex p-1 bg-[#1a2a1a] rounded-xl">
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedType('expense');
                                setParentCategoryId(''); // Reset parent if switching type
                            }}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${selectedType === 'expense' ? 'bg-[#ef4444]/20 text-[#ef4444]' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Expense
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedType('income');
                                setParentCategoryId('');
                            }}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${selectedType === 'income' ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Income
                        </button>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Groceries"
                            className="w-full h-12 px-4 bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl text-white focus:border-[#22c55e] focus:outline-none"
                            autoFocus
                        />
                    </div>

                    {/* Parent Category Select */}
                    <div>
                        <Select
                            label="Parent Category (Optional)"
                            value={parentCategoryId}
                            onChange={setParentCategoryId}
                            options={parentOptions}
                            placeholder="Select Parent..."
                        />
                        <p className="text-xs text-gray-600 mt-1">Select a parent to make this a subcategory.</p>
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
                            disabled={isSubmitting || !name.trim()}
                            className="flex-1 h-12 rounded-xl bg-[#22c55e] text-[#0a0f0a] font-bold hover:bg-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
