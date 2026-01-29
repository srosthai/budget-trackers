// =====================================================
// RECURRING RULES LIST (MODAL)
// =====================================================

'use client';

import { useState } from 'react';
import { Icons, ConfirmModal } from '@/components/ui';
import { useRecurringRules, useCategories } from '@/hooks';
import { RecurringRuleModal } from './RecurringRuleModal';

interface RecurringRulesListProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RecurringRulesList({ isOpen, onClose }: RecurringRulesListProps) {
    const { rules, isLoading, deleteRule, addRule } = useRecurringRules();
    const { categories } = useCategories();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [ruleToDelete, setRuleToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen) return null;

    const getCategoryName = (id: string) => categories.find(c => c.categoryId === id)?.name || 'Unknown';

    const handleDelete = async () => {
        if (!ruleToDelete) return;
        setIsDeleting(true);
        await deleteRule(ruleToDelete);
        setIsDeleting(false);
        setRuleToDelete(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-[#0a0f0a] border border-[#1a2f1a] rounded-2xl p-6 shadow-2xl h-[80vh] flex flex-col">
                <div className="flex items-center justify-between mb-6 shrink-0">
                    <h2 className="text-xl font-bold text-white">Recurring Transactions</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <Icons.X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {isLoading ? (
                        <div className="text-center text-gray-500 py-4">Loading...</div>
                    ) : rules.length > 0 ? (
                        rules.map(rule => (
                            <div key={rule.ruleId} className="p-4 bg-[#1a2a1a] rounded-xl border border-[#2a3f2a] flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-white">{rule.note || getCategoryName(rule.categoryId)}</p>
                                    <div className="text-xs text-gray-400 flex gap-2 mt-1">
                                        <span className="capitalize text-[#22c55e]">{rule.frequency}</span>
                                        <span>•</span>
                                        <span>Next: {rule.nextRunDate}</span>
                                    </div>
                                </div>
                                <div className="text-right flex items-center gap-3">
                                    <span className={`font-bold ${rule.type === 'income' ? 'text-[#22c55e]' : 'text-white'}`}>
                                        {rule.type === 'income' ? '+' : '-'}${rule.amount}
                                    </span>
                                    <button
                                        onClick={() => setRuleToDelete(rule.ruleId)}
                                        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
                                    >
                                        <Icons.Trash className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <Icons.Refresh className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No recurring rules set up.</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setIsAddOpen(true)}
                    className="mt-4 w-full h-12 bg-[#22c55e] text-[#0a0f0a] font-bold rounded-xl hover:bg-[#16a34a] shrink-0"
                >
                    Add New Rule
                </button>
            </div>

            <RecurringRuleModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSave={async (data) => {
                    const success = await addRule(data);
                    return success;
                }}
            />

            <ConfirmModal
                isOpen={!!ruleToDelete}
                onClose={() => setRuleToDelete(null)}
                onConfirm={handleDelete}
                title="Delete Recurring Rule?"
                description="This will stop future transactions from being created. Past transactions created by this rule will remain."
                confirmText="Delete Rule"
                isLoading={isDeleting}
            />
        </div>
    );
}
