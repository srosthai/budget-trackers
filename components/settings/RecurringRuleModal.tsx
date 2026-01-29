// =====================================================
// RECURRING RULE MODAL
// =====================================================

'use client';

import { useState } from 'react';
import { Icons, Select } from '@/components/ui';
import { useCategories } from '@/hooks';
import { RecurringRule } from '@/app/api/recurring/route';

interface RecurringRuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<RecurringRule>) => Promise<boolean>;
}

export function RecurringRuleModal({ isOpen, onClose, onSave }: RecurringRuleModalProps) {
    const [type, setType] = useState<'expense' | 'income'>('expense');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [frequency, setFrequency] = useState<'monthly' | 'weekly'>('monthly');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { expenseCategories, incomeCategories } = useCategories();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !categoryId) return;

        setIsSubmitting(true);
        const success = await onSave({
            type,
            amount: parseFloat(amount),
            categoryId,
            accountId: null, // Removed account
            frequency,
            nextRunDate: startDate,
            note
        } as any);
        setIsSubmitting(false);
        if (success) onClose();
    };

    const activeCategories = type === 'income' ? incomeCategories : expenseCategories;
    const categoryOptions = activeCategories.map(c => ({ value: c.categoryId, label: c.name, color: c.color }));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#0a0f0a] border border-[#1a2f1a] rounded-2xl p-6 shadow-2xl animate-scale-up max-h-[90vh] overflow-y-auto noscroll">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">New Recurring Transaction</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <Icons.X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Type */}
                    <div className="flex p-1 bg-[#1a2a1a] rounded-xl mb-4">
                        {['expense', 'income'].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => {
                                    setType(t as any);
                                    setCategoryId('');
                                }}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${type === t
                                    ? (t === 'expense' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500')
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full h-12 px-4 bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl text-white focus:border-[#22c55e] focus:outline-none"
                        />
                    </div>

                    <Select
                        label="Category"
                        value={categoryId}
                        onChange={setCategoryId}
                        options={categoryOptions}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Frequency</label>
                            <select
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value as any)}
                                className="w-full h-12 px-4 bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl text-white focus:border-[#22c55e] focus:outline-none"
                            >
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full h-12 px-4 bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl text-white focus:border-[#22c55e] focus:outline-none [color-scheme:dark]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Note</label>
                        <input
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full h-12 px-4 bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl text-white focus:border-[#22c55e] focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !amount || !categoryId}
                        className="w-full h-12 mt-4 rounded-xl bg-[#22c55e] text-[#0a0f0a] font-bold hover:bg-[#16a34a] disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Rule'}
                    </button>
                </form>
            </div>
        </div>
    );
}
