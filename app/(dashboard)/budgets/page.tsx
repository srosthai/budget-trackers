'use client';

import { DashboardLayout } from '@/components/layout';
import { Card, Badge, Icons, Button } from '@/components/ui';

// =====================================================
// BUDGETS PAGE
// 
// Budget management with progress tracking
// =====================================================

const budgets = [
    {
        id: 'bud_001',
        category: 'Food & Drinks',
        icon: '🍔',
        spent: 450,
        limit: 600,
        remaining: 150,
        percentage: 75,
    },
    {
        id: 'bud_002',
        category: 'Transport',
        icon: '🚗',
        spent: 280,
        limit: 300,
        remaining: 20,
        percentage: 93,
    },
    {
        id: 'bud_003',
        category: 'Entertainment',
        icon: '🎬',
        spent: 150,
        limit: 200,
        remaining: 50,
        percentage: 75,
    },
    {
        id: 'bud_004',
        category: 'Shopping',
        icon: '🛍️',
        spent: 320,
        limit: 500,
        remaining: 180,
        percentage: 64,
    },
    {
        id: 'bud_005',
        category: 'Utilities',
        icon: '💡',
        spent: 185,
        limit: 200,
        remaining: 15,
        percentage: 93,
    },
    {
        id: 'bud_006',
        category: 'Healthcare',
        icon: '🏥',
        spent: 50,
        limit: 300,
        remaining: 250,
        percentage: 17,
    },
];

const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
const totalRemaining = totalBudget - totalSpent;

export default function BudgetsPage() {
    return (
        <DashboardLayout title="Budgets" subtitle="Track your spending limits">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                            <Icons.ChartBar className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                            <p className="text-sm text-foreground-muted">Total Budget</p>
                            <p className="text-2xl font-bold text-foreground">${totalBudget.toLocaleString()}</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-expense/10 flex items-center justify-center">
                            <Icons.ArrowUp className="w-6 h-6 text-expense" />
                        </div>
                        <div>
                            <p className="text-sm text-foreground-muted">Total Spent</p>
                            <p className="text-2xl font-bold text-expense">${totalSpent.toLocaleString()}</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-income/10 flex items-center justify-center">
                            <Icons.Wallet className="w-6 h-6 text-income" />
                        </div>
                        <div>
                            <p className="text-sm text-foreground-muted">Remaining</p>
                            <p className="text-2xl font-bold text-income">${totalRemaining.toLocaleString()}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Overall Progress */}
            <Card className="mb-6">
                <Card.Header>
                    Monthly Progress
                    <Badge variant={totalSpent / totalBudget > 0.8 ? 'expense' : 'primary'}>
                        {Math.round((totalSpent / totalBudget) * 100)}% used
                    </Badge>
                </Card.Header>
                <Card.Body>
                    <div className="h-4 bg-background-tertiary rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${totalSpent / totalBudget >= 0.9 ? 'bg-expense' :
                                    totalSpent / totalBudget >= 0.75 ? 'bg-yellow-500' :
                                        'bg-primary-500'
                                }`}
                            style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-foreground-muted">
                        <span>${totalSpent.toLocaleString()} spent</span>
                        <span>${totalRemaining.toLocaleString()} remaining</span>
                    </div>
                </Card.Body>
            </Card>

            {/* Budget Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {budgets.map((budget) => {
                    const isOverBudget = budget.percentage >= 100;
                    const isNearLimit = budget.percentage >= 80;

                    return (
                        <Card key={budget.id} hover className="group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">{budget.icon}</div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">{budget.category}</h4>
                                        <p className="text-sm text-foreground-muted">
                                            ${budget.spent} / ${budget.limit}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isNearLimit && (
                                        <Badge variant={isOverBudget ? 'expense' : 'warning'} size="sm">
                                            {isOverBudget ? 'Over!' : 'Near limit'}
                                        </Badge>
                                    )}
                                    <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-background-tertiary transition-all">
                                        <Icons.DotsVertical className="w-4 h-4 text-foreground-muted" />
                                    </button>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-3 bg-background-tertiary rounded-full overflow-hidden mb-3">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${budget.percentage >= 100 ? 'bg-expense' :
                                            budget.percentage >= 80 ? 'bg-yellow-500' :
                                                'bg-primary-500'
                                        }`}
                                    style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className={`font-medium ${isOverBudget ? 'text-expense' :
                                        isNearLimit ? 'text-yellow-500' :
                                            'text-foreground'
                                    }`}>
                                    {budget.percentage}%
                                </span>
                                <span className={`${budget.remaining > 0 ? 'text-income' : 'text-expense'}`}>
                                    {budget.remaining > 0 ? `$${budget.remaining} left` : `$${Math.abs(budget.remaining)} over`}
                                </span>
                            </div>
                        </Card>
                    );
                })}

                {/* Add Budget Card */}
                <Card
                    className="border-2 border-dashed border-border hover:border-primary-500 bg-transparent cursor-pointer group"
                    hover
                >
                    <div className="flex flex-col items-center justify-center h-full min-h-[180px] text-foreground-muted group-hover:text-primary-500 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-background-tertiary group-hover:bg-primary-500/10 flex items-center justify-center mb-3 transition-colors">
                            <Icons.Plus className="w-6 h-6" />
                        </div>
                        <p className="font-medium">Create New Budget</p>
                        <p className="text-sm text-foreground-subtle mt-1">Set spending limits</p>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
