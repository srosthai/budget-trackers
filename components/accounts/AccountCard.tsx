// =====================================================
// ACCOUNT CARD
// =====================================================

'use client';

import { Account } from '@/hooks/useAccounts';
import { Icons } from '@/components/ui';

interface AccountCardProps {
    account: Account;
    onEdit: (account: Account) => void;
    onDelete: (id: string) => void;
}

export function AccountCard({ account, onEdit, onDelete }: AccountCardProps) {
    const Icon = Icons.Wallet; // Default or map based on type

    // Dynamic gradient based on type/color
    const bgClass = account.type === 'bank'
        ? 'from-blue-600 to-blue-800'
        : account.type === 'ewallet'
            ? 'from-purple-600 to-purple-800'
            : account.type === 'credit'
                ? 'from-red-600 to-red-800'
                : 'from-emerald-500 to-emerald-700'; // Cash

    return (
        <div className={`relative p-5 rounded-2xl bg-gradient-to-br ${bgClass} shadow-lg text-white overflow-hidden group`}>
            {/* Background pattern/decor */}
            <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-medium opacity-90">{account.name}</p>
                        <p className="text-xs opacity-75 capitalize">{account.type}</p>
                    </div>
                </div>

                <button
                    onClick={() => onEdit(account)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                    <Icons.Pencil className="w-4 h-4 opacity-80" />
                </button>
            </div>

            <div className="mt-8 relative z-10">
                <p className="text-sm opacity-80 mb-1">Balance</p>
                <h3 className="text-3xl font-bold tracking-tight">
                    {account.currency === 'USD' ? '$' : '៛'}
                    {account.balance?.toLocaleString() || account.startingBalance.toLocaleString()}
                </h3>
            </div>

            {/* Quick Actions (Delete usually hidden in menu, simple trash here for now) */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this account?')) onDelete(account.accountId);
                    }}
                    className="p-2 bg-black/20 hover:bg-red-500/80 rounded-lg text-white/80 hover:text-white transition-colors"
                >
                    <Icons.Trash className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
