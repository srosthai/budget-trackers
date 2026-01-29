'use client';

import { DashboardLayout } from '@/components/layout';
import { Card, Badge, Icons, Button } from '@/components/ui';

// =====================================================
// ACCOUNTS PAGE
// 
// Account management with:
// - Account cards with balance
// - Quick transfer
// - Account details
// =====================================================

const accounts = [
    {
        id: 'acc_001',
        name: 'Cash',
        type: 'cash',
        balance: 450.00,
        currency: 'USD',
        color: '#22c55e',
        icon: 'BankNotes',
        lastActivity: '2 hours ago',
        transactions: 24,
    },
    {
        id: 'acc_002',
        name: 'ABA Bank',
        type: 'bank',
        balance: 8750.00,
        currency: 'USD',
        color: '#0066b2',
        icon: 'CreditCard',
        lastActivity: 'Today',
        transactions: 156,
    },
    {
        id: 'acc_003',
        name: 'ACLEDA Bank',
        type: 'bank',
        balance: 2850.00,
        currency: 'USD',
        color: '#ffc107',
        icon: 'CreditCard',
        lastActivity: '3 days ago',
        transactions: 45,
    },
    {
        id: 'acc_004',
        name: 'PayPal',
        type: 'ewallet',
        balance: 400.00,
        currency: 'USD',
        color: '#00457c',
        icon: 'Wallet',
        lastActivity: '1 week ago',
        transactions: 12,
    },
    {
        id: 'acc_005',
        name: 'Wing',
        type: 'ewallet',
        balance: 125.50,
        currency: 'USD',
        color: '#ff6600',
        icon: 'Wallet',
        lastActivity: 'Yesterday',
        transactions: 8,
    },
    {
        id: 'acc_006',
        name: 'Credit Card',
        type: 'credit',
        balance: -850.00,
        currency: 'USD',
        color: '#dc2626',
        icon: 'CreditCard',
        lastActivity: '5 days ago',
        transactions: 18,
    },
];

const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

export default function AccountsPage() {
    return (
        <DashboardLayout title="Accounts" subtitle="Manage your wallets & bank accounts">
            {/* Total Balance Card */}
            <Card className="mb-6 bg-gradient-to-br from-primary-600 to-primary-800 border-0 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-primary-200 text-sm mb-1">Total Balance</p>
                        <p className="text-4xl font-bold">
                            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-primary-200 text-sm mt-2">
                            Across {accounts.length} accounts
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                            icon={<Icons.ArrowsRightLeft className="w-4 h-4" />}
                        >
                            Transfer
                        </Button>
                        <Button
                            className="bg-white text-primary-700 hover:bg-white/90"
                            icon={<Icons.Plus className="w-4 h-4" />}
                        >
                            Add Account
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-background-secondary">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{accounts.filter(a => a.type === 'cash').length}</p>
                        <p className="text-sm text-foreground-muted">Cash</p>
                    </div>
                </Card>
                <Card className="bg-background-secondary">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{accounts.filter(a => a.type === 'bank').length}</p>
                        <p className="text-sm text-foreground-muted">Bank Accounts</p>
                    </div>
                </Card>
                <Card className="bg-background-secondary">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{accounts.filter(a => a.type === 'ewallet').length}</p>
                        <p className="text-sm text-foreground-muted">E-Wallets</p>
                    </div>
                </Card>
                <Card className="bg-background-secondary">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{accounts.filter(a => a.type === 'credit').length}</p>
                        <p className="text-sm text-foreground-muted">Credit Cards</p>
                    </div>
                </Card>
            </div>

            {/* Accounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {accounts.map((account) => {
                    const Icon = Icons[account.icon as keyof typeof Icons];
                    const isNegative = account.balance < 0;

                    return (
                        <Card
                            key={account.id}
                            hover
                            className="group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                                        style={{ backgroundColor: account.color }}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{account.name}</h3>
                                        <Badge variant="default" size="sm" className="capitalize mt-1">
                                            {account.type}
                                        </Badge>
                                    </div>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-background-tertiary transition-all">
                                    <Icons.DotsVertical className="w-5 h-5 text-foreground-muted" />
                                </button>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-foreground-muted mb-1">Current Balance</p>
                                <p className={`text-2xl font-bold ${isNegative ? 'text-expense' : 'text-foreground'}`}>
                                    {isNegative ? '-' : ''}${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                <div className="text-sm text-foreground-muted">
                                    <span className="font-medium text-foreground">{account.transactions}</span> transactions
                                </div>
                                <p className="text-xs text-foreground-subtle">
                                    Last: {account.lastActivity}
                                </p>
                            </div>
                        </Card>
                    );
                })}

                {/* Add Account Card */}
                <Card
                    className="border-2 border-dashed border-border hover:border-primary-500 bg-transparent cursor-pointer group"
                    hover
                >
                    <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-foreground-muted group-hover:text-primary-500 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-background-tertiary group-hover:bg-primary-500/10 flex items-center justify-center mb-3 transition-colors">
                            <Icons.Plus className="w-6 h-6" />
                        </div>
                        <p className="font-medium">Add New Account</p>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
