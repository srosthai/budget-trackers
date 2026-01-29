// =====================================================
// TRANSACTION STATS STRIP
// 
// Shows Total Income vs Expense summaries
// =====================================================

'use client';

interface TransactionStatsStripProps {
    income: number;
    expense: number;
}

export function TransactionStatsStrip({ income, expense }: TransactionStatsStripProps) {
    const format = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="flex justify-between items-center px-6 py-4 bg-[#0a0f0a] border-b border-[#1a2f1a]">
            <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Income</p>
                <p className="text-base font-bold text-[#22c55e]">{format(income)}</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Expense</p>
                <p className="text-base font-bold text-[#ef4444]">{format(expense)}</p>
            </div>
        </div>
    );
}
