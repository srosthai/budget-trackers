'use client';

import { DashboardLayout } from '@/components/layout';
import { Card, Badge, Icons, Button } from '@/components/ui';

// =====================================================
// DASHBOARD PAGE
// 
// Main dashboard with:
// - Stat cards (Income, Expense, Profit)
// - Recent transactions list
// - Top spending categories
// - Quick actions
// =====================================================

// Mock data for static UI
const stats = [
    {
        label: 'Total Income',
        value: '$4,250.00',
        change: '+12.5%',
        trend: 'up' as const,
        icon: 'ArrowDown' as const,
        color: 'income',
    },
    {
        label: 'Total Expense',
        value: '$2,180.00',
        change: '+5.2%',
        trend: 'up' as const,
        icon: 'ArrowUp' as const,
        color: 'expense',
    },
    {
        label: 'Net Profit',
        value: '$2,070.00',
        change: '+18.3%',
        trend: 'up' as const,
        icon: 'TrendingUp' as const,
        color: 'primary',
    },
    {
        label: 'Total Balance',
        value: '$12,450.00',
        change: '+8.1%',
        trend: 'up' as const,
        icon: 'Wallet' as const,
        color: 'transfer',
    },
];

const recentTransactions = [
    {
        id: '1',
        description: 'Salary - January',
        category: 'Salary',
        type: 'income' as const,
        amount: 3500,
        date: '2026-01-28',
        account: 'ABA Bank',
    },
    {
        id: '2',
        description: 'Coffee & Snacks',
        category: 'Food & Drinks',
        type: 'expense' as const,
        amount: 12.50,
        date: '2026-01-28',
        account: 'Cash',
    },
    {
        id: '3',
        description: 'Electricity Bill',
        category: 'Utilities',
        type: 'expense' as const,
        amount: 85.00,
        date: '2026-01-27',
        account: 'ABA Bank',
    },
    {
        id: '4',
        description: 'Freelance Project',
        category: 'Freelance',
        type: 'income' as const,
        amount: 750,
        date: '2026-01-26',
        account: 'PayPal',
    },
    {
        id: '5',
        description: 'Transfer to Savings',
        category: 'Transfer',
        type: 'transfer' as const,
        amount: 500,
        date: '2026-01-25',
        account: 'ABA → ACLEDA',
    },
];

const topCategories = [
    { name: 'Food & Drinks', amount: 450, budget: 600, percentage: 75 },
    { name: 'Transport', amount: 280, budget: 300, percentage: 93 },
    { name: 'Entertainment', amount: 150, budget: 200, percentage: 75 },
    { name: 'Shopping', amount: 320, budget: 500, percentage: 64 },
    { name: 'Utilities', amount: 185, budget: 200, percentage: 93 },
];

const accounts = [
    { name: 'Cash', balance: 450.00, color: '#22c55e' },
    { name: 'ABA Bank', balance: 8750.00, color: '#0066b2' },
    { name: 'ACLEDA', balance: 2850.00, color: '#ffc107' },
    { name: 'PayPal', balance: 400.00, color: '#00457c' },
];

export default function DashboardPage() {
    return (
        <DashboardLayout title="Dashboard" subtitle="January 2026">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => {
                    const Icon = Icons[stat.icon];
                    return (
                        <Card
                            key={stat.label}
                            className={`stat-card animate-slide-up delay-${(index + 1) * 100}`}
                            padding="md"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-foreground-muted mb-1">{stat.label}</p>
                                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <Icons.TrendingUp className={`w-4 h-4 ${stat.trend === 'up' ? 'text-income' : 'text-expense'}`} />
                                        <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-income' : 'text-expense'}`}>
                                            {stat.change}
                                        </span>
                                        <span className="text-xs text-foreground-subtle">vs last month</span>
                                    </div>
                                </div>
                                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  ${stat.color === 'income' ? 'bg-income/10 text-income' : ''}
                  ${stat.color === 'expense' ? 'bg-expense/10 text-expense' : ''}
                  ${stat.color === 'primary' ? 'bg-primary-500/10 text-primary-500' : ''}
                  ${stat.color === 'transfer' ? 'bg-transfer/10 text-transfer' : ''}
                `}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Recent Transactions - Takes 2 columns */}
                <Card className="xl:col-span-2" padding="none">
                    <Card.Header className="px-6 pt-6">
                        Recent Transactions
                        <Button variant="ghost" size="sm">
                            View All
                            <Icons.ChevronRight className="w-4 h-4" />
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <div className="divide-y divide-border">
                            {recentTransactions.map((tx) => (
                                <div
                                    key={tx.id}
                                    className="flex items-center gap-4 px-6 py-4 hover:bg-background-tertiary/50 transition-colors"
                                >
                                    {/* Transaction Icon */}
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

                                    {/* Transaction Details */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {tx.description}
                                        </p>
                                        <p className="text-xs text-foreground-muted">
                                            {tx.category} • {tx.account}
                                        </p>
                                    </div>

                                    {/* Amount & Date */}
                                    <div className="text-right shrink-0">
                                        <p className={`text-sm font-semibold ${tx.type === 'income' ? 'text-income' :
                                                tx.type === 'expense' ? 'text-expense' :
                                                    'text-transfer'
                                            }`}>
                                            {tx.type === 'income' ? '+' : tx.type === 'expense' ? '-' : ''}
                                            ${tx.amount.toFixed(2)}
                                        </p>
                                        <p className="text-xs text-foreground-muted">{tx.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Accounts Overview */}
                    <Card>
                        <Card.Header>
                            Accounts
                            <Button variant="ghost" size="sm" icon={<Icons.Plus className="w-4 h-4" />}>
                                Add
                            </Button>
                        </Card.Header>
                        <Card.Body className="space-y-3">
                            {accounts.map((account) => (
                                <div
                                    key={account.name}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-background-tertiary/50 hover:bg-background-tertiary transition-colors cursor-pointer"
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                                        style={{ backgroundColor: account.color }}
                                    >
                                        {account.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">{account.name}</p>
                                        <p className="text-xs text-foreground-muted">Active</p>
                                    </div>
                                    <p className="text-sm font-semibold text-foreground">
                                        ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>

                    {/* Top Spending Categories */}
                    <Card>
                        <Card.Header>
                            Budget Overview
                            <Badge variant="warning" size="sm">2 near limit</Badge>
                        </Card.Header>
                        <Card.Body className="space-y-4">
                            {topCategories.map((category) => (
                                <div key={category.name} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-foreground-muted">{category.name}</span>
                                        <span className="font-medium text-foreground">
                                            ${category.amount} / ${category.budget}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${category.percentage >= 90 ? 'bg-expense' :
                                                    category.percentage >= 75 ? 'bg-yellow-500' :
                                                        'bg-primary-500'
                                                }`}
                                            style={{ width: `${category.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
