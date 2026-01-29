// =====================================================
// ACCOUNT MODAL
// 
// Add/Edit account form
// =====================================================

'use client';

import { useState, useEffect } from 'react';
import { Icons } from '@/components/ui';
import { Account } from '@/hooks/useAccounts';

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<Account>) => Promise<boolean>;
    initialData?: Account;
}

const ACCOUNT_TYPES = [
    { id: 'cash', label: 'Cash', icon: 'BankNotes' },
    { id: 'bank', label: 'Bank', icon: 'CreditCard' },
    { id: 'ewallet', label: 'E-Wallet', icon: 'Wallet' },
    { id: 'credit', label: 'Credit Card', icon: 'CreditCard' },
];

export function AccountModal({ isOpen, onClose, onSave, initialData }: AccountModalProps) {
    const [name, setName] = useState('');
    const [type, setType] = useState('cash');
    const [balance, setBalance] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setType(initialData.type);
            setBalance(initialData.startingBalance.toString());
            setCurrency(initialData.currency);
        } else {
            setName('');
            setType('cash');
            setBalance('');
            setCurrency('USD');
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        const success = await onSave({
            name,
            type,
            startingBalance: parseFloat(balance) || 0,
            currency,
            color: type === 'cash' ? '#22c55e' : type === 'bank' ? '#3b82f6' : '#f97316' // Simple color logic
        });
        setIsSubmitting(false);

        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#0a0f0a] border border-[#1a2f1a] rounded-2xl p-6 shadow-2xl animate-scale-up">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {initialData ? 'Edit Account' : 'New Account'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <Icons.X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Type Grid */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {ACCOUNT_TYPES.map(t => {
                            const Icon = Icons[t.icon as keyof typeof Icons];
                            const isSelected = type === t.id;
                            return (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setType(t.id)}
                                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${isSelected
                                            ? 'bg-[#22c55e]/20 border-[#22c55e] text-[#22c55e]'
                                            : 'bg-[#1a2a1a] border-transparent text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    <Icon className="w-6 h-6 mb-1" />
                                    <span className="text-[10px] font-medium">{t.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Account Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. My Wallet"
                            className="w-full h-12 px-4 bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl text-white focus:border-[#22c55e] focus:outline-none"
                            autoFocus
                        />
                    </div>

                    <div className="flex gap-4">
                        {/* Balance */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Balance</label>
                            <input
                                type="number"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                placeholder="0.00"
                                className="w-full h-12 px-4 bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl text-white focus:border-[#22c55e] focus:outline-none"
                            />
                        </div>

                        {/* Currency */}
                        <div className="w-24">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Currency</label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="w-full h-12 px-2 bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl text-white focus:border-[#22c55e] focus:outline-none"
                            >
                                <option value="USD">USD</option>
                                <option value="KHR">KHR</option>
                            </select>
                        </div>
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
