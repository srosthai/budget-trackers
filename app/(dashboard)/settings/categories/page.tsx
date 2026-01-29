'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icons } from '@/components/ui';
import { useCategories, useSmartRules, Category } from '@/hooks'; // Import Category type
import { SettingsTabs, CategoryListItem, SmartRuleCard, CategoryModal, SmartRuleModal, RecurringRulesList } from '@/components/settings';
import { ConfirmModal } from '@/components/ui';
import { BottomNavigation } from '@/components/dashboard';

export default function CategoriesPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'categories' | 'rules'>('categories');
    const [search, setSearch] = useState('');

    // Modal States
    const [isCatModalOpen, setIsCatModalOpen] = useState(false);
    const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
    const [isRecurringOpen, setIsRecurringOpen] = useState(false);

    // Delete State
    const [deletingItem, setDeletingItem] = useState<{ type: 'category' | 'rule', id: string, name: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Edit States
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
    // const [editingRule, setEditingRule] = useState<SmartRule | undefined>(undefined);

    const {
        categories,
        expenseCategories,
        incomeCategories,
        isLoading: isCatsLoading,
        addCategory,
        updateCategory,
        deleteCategory
    } = useCategories();

    const {
        rules,
        isLoading: isRulesLoading,
        addRule,
        deleteRule
    } = useSmartRules();

    const isLoading = isCatsLoading || isRulesLoading;

    // Filter categories
    const filteredExpense = expenseCategories.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredIncome = incomeCategories.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    // Filter rules
    const filteredRules = rules.filter(r =>
        (r.pattern || '').toLowerCase().includes(search.toLowerCase())
    );

    const handleAdd = () => {
        if (activeTab === 'categories') {
            setEditingCategory(undefined); // Clear edit state
            setIsCatModalOpen(true);
        } else {
            setIsRuleModalOpen(true);
        }
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setIsCatModalOpen(true);
    };

    const handleDeleteCategory = (category: Category) => {
        setDeletingItem({ type: 'category', id: category.categoryId, name: category.name });
    };

    const handleConfirmDelete = async () => {
        if (!deletingItem) return;
        setIsDeleting(true);
        try {
            if (deletingItem.type === 'category') {
                await deleteCategory(deletingItem.id);
            } else {
                await deleteRule(deletingItem.id);
            }
        } finally {
            setIsDeleting(false);
            setDeletingItem(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f0a] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sticky top-0 bg-[#0a0f0a] z-10">
                <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-400 hover:text-white">
                    <Icons.ChevronDown className="w-6 h-6 rotate-90" />
                </button>
                <h1 className="text-lg font-bold text-white">Categories</h1>
                <button
                    onClick={handleAdd}
                    className="w-9 h-9 rounded-lg bg-[#22c55e] flex items-center justify-center text-[#0a0f0a] hover:bg-[#16a34a] transition-colors"
                >
                    <Icons.Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 px-4 pb-24 overflow-y-auto">
                {/* Tabs */}
                <SettingsTabs activeTab={activeTab} onChange={setActiveTab} />

                {/* Search */}
                <div className="relative mb-6">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search categories or vendors"
                        className="w-full h-12 pl-10 pr-4 bg-[#1a2a1a] text-white rounded-xl border border-[#2a3f2a] focus:border-[#22c55e] focus:outline-none placeholder:text-gray-500 text-sm transition-all shadow-inner"
                    />
                </div>

                {/* Categories View */}
                {activeTab === 'categories' && (
                    <div className="space-y-6">
                        {/* Recurring Transactions Toggle */}
                        <div
                            onClick={() => setIsRecurringOpen(true)}
                            className="p-4 bg-[#1a2a1a] rounded-xl border border-[#2a3f2a] flex items-center gap-4 cursor-pointer hover:border-[#22c55e] transition-colors"
                        >
                            <div className="w-10 h-10 rounded-lg bg-[#22c55e]/20 flex items-center justify-center text-[#22c55e]">
                                <Icons.ArrowRight className="w-5 h-5 rotate-180" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white">Recurring Transactions</p>
                                <p className="text-xs text-gray-500">Manage subscriptions & fixed costs</p>
                            </div>
                            <div className="w-10 h-6 bg-[#22c55e] rounded-full relative">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>

                        {/* Expenses */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-base font-bold text-white">Expense Categories</h2>

                            </div>
                            <div className="space-y-3">
                                {filteredExpense.length > 0 ? (
                                    filteredExpense.map(cat => (
                                        <CategoryListItem
                                            key={cat.categoryId}
                                            category={cat}
                                            onEdit={handleEditCategory}
                                            onDelete={handleDeleteCategory}
                                        />
                                    ))
                                ) : (
                                    !isLoading && <p className="text-sm text-gray-500 text-center py-4">No categories found</p>
                                )}
                            </div>
                        </div>

                        {/* Income */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-base font-bold text-white">Income Categories</h2>
                            </div>
                            <div className="space-y-3">
                                {filteredIncome.length > 0 ? (
                                    filteredIncome.map(cat => (
                                        <CategoryListItem
                                            key={cat.categoryId}
                                            category={cat}
                                            onEdit={handleEditCategory}
                                            onDelete={handleDeleteCategory}
                                        />
                                    ))
                                ) : (
                                    !isLoading && <p className="text-sm text-gray-500 text-center py-4">No categories found</p>
                                )}
                            </div>
                        </div>


                    </div>
                )}

                {/* Smart Rules View */}
                {activeTab === 'rules' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="p-5 bg-gradient-to-br from-[#1a2a1a] to-[#0f1610] rounded-2xl border border-[#2a3f2a]">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Icons.TrendingUp className="w-5 h-5 text-[#22c55e]" />
                                    <h2 className="text-base font-bold text-white">Active Smart Rules</h2>
                                </div>
                                <span className="px-2 py-1 rounded bg-[#22c55e]/20 text-[#22c55e] text-xs font-bold">
                                    {filteredRules.length} Active
                                </span>
                            </div>

                            <div className="space-y-3">
                                {filteredRules.length > 0 ? (
                                    filteredRules.map(rule => (
                                        <SmartRuleCard
                                            key={rule.ruleId}
                                            pattern={rule.pattern}
                                            categoryName={
                                                categories.find(c => c.categoryId === rule.categoryId)?.name || 'Unknown'
                                            }
                                            onDelete={() => setDeletingItem({ type: 'rule', id: rule.ruleId, name: 'Smart Rule' })}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-6">
                                        <p className="text-sm text-gray-500 mb-2">No smart rules yet</p>
                                        <p className="text-xs text-gray-600">Create rules to auto-categorize transactions</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setIsRuleModalOpen(true)}
                                className="w-full mt-4 h-12 bg-[#22c55e] hover:bg-[#16a34a] text-[#0a0f0a] font-bold rounded-xl transition-colors"
                            >
                                Add Smart Rule
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            <CategoryModal
                isOpen={isCatModalOpen}
                onClose={() => setIsCatModalOpen(false)}
                onSave={async (data) => {
                    if (editingCategory) {
                        return await updateCategory(editingCategory.categoryId, data);
                    } else {
                        return await addCategory(data);
                    }
                }}
                initialData={editingCategory}
                categories={categories}
            />

            <SmartRuleModal
                isOpen={isRuleModalOpen}
                onClose={() => setIsRuleModalOpen(false)}
                onSave={async (pattern, categoryId) => {
                    return await addRule(pattern, categoryId);
                }}
                categories={categories}
            />

            <RecurringRulesList
                isOpen={isRecurringOpen}
                onClose={() => setIsRecurringOpen(false)}
            />

            <ConfirmModal
                isOpen={!!deletingItem}
                onClose={() => setDeletingItem(null)}
                onConfirm={handleConfirmDelete}
                title={`Delete ${deletingItem?.type === 'category' ? 'Category' : 'Rule'}?`}
                description={
                    deletingItem?.type === 'category'
                        ? `Are you sure you want to delete "${deletingItem?.name}"? Transactions related to this category might lose their label.`
                        : "Are you sure you want to delete this smart rule?"
                }
                confirmText="Delete"
                isLoading={isDeleting}
            />

            {/* Mobile Nav */}
            <div className="lg:hidden">
                <BottomNavigation />
            </div>
        </div>
    );
}
