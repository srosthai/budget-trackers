// =====================================================
// TRANSACTION GROUP
// 
// Wrapper for grouped transactions by date
// =====================================================

'use client';

import { TransactionItem } from './TransactionItem';

interface Transaction {
    transactionId: string;
    type: 'income' | 'expense' | 'transfer';
    date: string;
    amount: number;
    categoryId: string;
    accountId: string;
    note: string;
}

interface TransactionGroupProps {
    title: string;
    transactions: Transaction[];
}

export function TransactionGroup({ title, transactions }: TransactionGroupProps) {
    return (
        <div className="pb-2">
            <h3 className="px-6 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest sticky top-[138px] bg-[#0a0f0a] z-[5]">
                {title}
            </h3>
            <div className="space-y-1">
                {transactions.map((tx) => (
                    <TransactionItem
                        key={tx.transactionId}
                        note={tx.note}
                        accountName={tx.accountId || 'Cash'} // To be enriched
                        categoryName={tx.categoryId || 'Uncategorized'} // To be enriched
                        amount={tx.amount}
                        type={tx.type}
                    />
                ))}
            </div>
        </div>
    );
}
