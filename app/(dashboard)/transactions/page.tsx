'use client';

import { DashboardLayout } from '@/components/layout';
import { Card, Badge, Icons, Button, Input } from '@/components/ui';

// =====================================================
// TRANSACTIONS PAGE
// 
// Full transaction list with:
// - Filters (date, category, type, account)
// - Search
// - Transaction list with pagination
// =====================================================

const transactions = [
    {
        id: 'txn_001',
        description: 'Salary - January',
        category: 'Salary',
        type: 'income' as const,
        amount: 3500,
        date: '2026-01-28',
        account: 'ABA Bank',
        note: 'Monthly salary',
    },
    {
        id: 'txn_002',
        description: 'Coffee at Brown',
        category: 'Food & Drinks',
        type: 'expense' as const,
        amount: 4.50,
        date: '2026-01-28',
        account: 'Cash',
        note: 'Morning coffee',
    },
    {
        id: 'txn_003',
        description: 'Grab Ride',
        category: 'Transport',
        type: 'expense' as const,
        amount: 8.00,
        date: '2026-01-28',
        account: 'ABA Bank',
        note: 'To office',
    },
    {
        id: 'txn_004',
        description: 'Electricity Bill',
        category: 'Utilities',
        type: 'expense' as const,
        amount: 85.00,
        date: '2026-01-27',
        account: 'ABA Bank',
        note: 'January bill',
    },
    {
        id: 'txn_005',
        description: 'Freelance Project',
        category: 'Freelance',
        type: 'income' as const,
        amount: 750,
        date: '2026-01-26',
        account: 'PayPal',
        note: 'Website design',
    },
    {
        id: 'txn_006',
        description: 'Transfer to Savings',
        category: 'Transfer',
        type: 'transfer' as const,
        amount: 500,
        date: '2026-01-25',
        account: 'ABA → ACLEDA',
        note: 'Monthly savings',
    },
    {
        id: 'txn_007',
        description: 'Grocery Shopping',
        category: 'Food & Drinks',
        type: 'expense' as const,
        amount: 67.80,
        date: '2026-01-25',
        account: 'Cash',
        note: 'Weekly groceries',
    },
    {
        id: 'txn_008',
        description: 'Netflix Subscription',
        category: 'Entertainment',
        type: 'expense' as const,
        amount: 15.99,
        date: '2026-01-24',
        account: 'ABA Bank',
        note: 'Monthly subscription',
    },
    {
        id: 'txn_009',
        description: 'Phone Top-up',
        category: 'Utilities',
        type: 'expense' as const,
        amount: 10.00,
        date: '2026-01-23',
        account: 'Cash',
        note: 'Smart prepaid',
    },
    {
        id: 'txn_010',
        description: 'Side Project Payment',
        category: 'Freelance',
        type: 'income' as const,
        amount: 200,
        date: '2026-01-22',
        account: 'PayPal',
        note: 'Logo design',
    },
];

const categories = ['All', 'Food & Drinks', 'Transport', 'Utilities', 'Entertainment', 'Salary', 'Freelance'];
const types = ['All', 'Income', 'Expense', 'Transfer'];
const accounts = ['All', 'Cash', 'ABA Bank', 'ACLEDA', 'PayPal'];

export default function TransactionsPage() {
    return (
        <DashboardLayout title="Transactions" subtitle="Manage your income & expenses">
            {/* Filters Section */}
            <Card className="mb-6" padding="md">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <Input
                            placeholder="Search transactions..."
                            icon={<Icons.Search className="w-4 h-4" />}
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {/* Type Filter */}
                        <select className="h-10 px-4 bg-background-tertiary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500">
                            {types.map((type) => (
                                <option key={type} value={type.toLowerCase()}>{type}</option>
                            ))}
                        </select>

                        {/* Category Filter */}
                        <select className="h-10 px-4 bg-background-tertiary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500">
                            {categories.map((cat) => (
                                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                            ))}
                        </select>

                        {/* Account Filter */}
                        <select className="h-10 px-4 bg-background-tertiary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500">
                            {accounts.map((acc) => (
                                <option key={acc} value={acc.toLowerCase()}>{acc}</option>
                            ))}
                        </select>

                        {/* Date Range */}
                        <Button variant="outline" icon={<Icons.Calendar className="w-4 h-4" />}>
                            Jan 1 - Jan 28
                        </Button>

                        {/* Export */}
                        <Button variant="secondary" icon={<Icons.Download className="w-4 h-4" />}>
                            Export
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card className="bg-income/5 border-income/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-income/10 flex items-center justify-center">
                            <Icons.ArrowDown className="w-5 h-5 text-income" />
                        </div>
                        <div>
                            <p className="text-sm text-foreground-muted">Total Income</p>
                            <p className="text-xl font-bold text-income">+$4,450.00</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-expense/5 border-expense/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-expense/10 flex items-center justify-center">
                            <Icons.ArrowUp className="w-5 h-5 text-expense" />
                        </div>
                        <div>
                            <p className="text-sm text-foreground-muted">Total Expense</p>
                            <p className="text-xl font-bold text-expense">-$191.29</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-transfer/5 border-transfer/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-transfer/10 flex items-center justify-center">
                            <Icons.ArrowsRightLeft className="w-5 h-5 text-transfer" />
                        </div>
                        <div>
                            <p className="text-sm text-foreground-muted">Transfers</p>
                            <p className="text-xl font-bold text-transfer">$500.00</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Transactions List */}
            <Card padding="none">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-background-tertiary/50 border-b border-border text-sm font-medium text-foreground-muted">
                    <div className="col-span-4">Description</div>
                    <div className="col-span-2">Category</div>
                    <div className="col-span-2">Account</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2 text-right">Amount</div>
                </div>

                {/* Transaction Rows */}
                <div className="divide-y divide-border">
                    {transactions.map((tx) => (
                        <div
                            key={tx.id}
                            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 hover:bg-background-tertiary/50 transition-colors cursor-pointer group"
                        >
                            {/* Description */}
                            <div className="col-span-4 flex items-center gap-3">
                                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                  ${tx.type === 'income' ? 'bg-income/10' : ''}
                  ${tx.type === 'expense' ? 'bg-expense/10' : ''}
                  ${tx.type === 'transfer' ? 'bg-transfer/10' : ''}
                `}>
                                    {tx.type === 'income' && <Icons.ArrowDown className="w-5 h-5 text-income" />}
                                    {tx.type === 'expense' && <Icons.ArrowUp className="w-5 h-5 text-expense" />}
                                    {tx.type === 'transfer' && <Icons.ArrowsRightLeft className="w-5 h-5 text-transfer" />}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                                    <p className="text-xs text-foreground-muted truncate md:hidden">
                                        {tx.category} • {tx.date}
                                    </p>
                                </div>
                            </div>

                            {/* Category */}
                            <div className="hidden md:flex col-span-2 items-center">
                                <Badge variant="default" size="sm">{tx.category}</Badge>
                            </div>

                            {/* Account */}
                            <div className="hidden md:flex col-span-2 items-center text-sm text-foreground-muted">
                                {tx.account}
                            </div>

                            {/* Date */}
                            <div className="hidden md:flex col-span-2 items-center text-sm text-foreground-muted">
                                {tx.date}
                            </div>

                            {/* Amount */}
                            <div className="col-span-2 flex items-center justify-end gap-2">
                                <span className={`text-sm font-semibold ${tx.type === 'income' ? 'text-income' :
                                        tx.type === 'expense' ? 'text-expense' :
                                            'text-transfer'
                                    }`}>
                                    {tx.type === 'income' ? '+' : tx.type === 'expense' ? '-' : ''}
                                    ${tx.amount.toFixed(2)}
                                </span>
                                <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-background-secondary transition-all">
                                    <Icons.DotsVertical className="w-4 h-4 text-foreground-muted" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                    <p className="text-sm text-foreground-muted">
                        Showing 1-10 of 156 transactions
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>
                            Previous
                        </Button>
                        <Button variant="outline" size="sm">
                            Next
                        </Button>
                    </div>
                </div>
            </Card>
        </DashboardLayout>
    );
}
