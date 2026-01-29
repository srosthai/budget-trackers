'use client';

import { DashboardLayout } from '@/components/layout';
import { Card, Badge, Icons, Button } from '@/components/ui';

// =====================================================
// CATEGORIES PAGE
// 
// Category management for income and expenses
// =====================================================

const incomeCategories = [
    { id: 'cat_001', name: 'Salary', icon: '💰', transactions: 12, total: 42000, color: '#22c55e' },
    { id: 'cat_002', name: 'Freelance', icon: '💻', transactions: 8, total: 5600, color: '#10b981' },
    { id: 'cat_003', name: 'Investments', icon: '📈', transactions: 3, total: 1200, color: '#059669' },
    { id: 'cat_004', name: 'Other Income', icon: '🎁', transactions: 5, total: 450, color: '#047857' },
];

const expenseCategories = [
    { id: 'cat_101', name: 'Food & Drinks', icon: '🍔', transactions: 45, total: 850, color: '#ef4444' },
    { id: 'cat_102', name: 'Transport', icon: '🚗', transactions: 28, total: 420, color: '#f97316' },
    { id: 'cat_103', name: 'Entertainment', icon: '🎬', transactions: 12, total: 280, color: '#f59e0b' },
    { id: 'cat_104', name: 'Shopping', icon: '🛍️', transactions: 15, total: 650, color: '#eab308' },
    { id: 'cat_105', name: 'Utilities', icon: '💡', transactions: 8, total: 320, color: '#84cc16' },
    { id: 'cat_106', name: 'Rent', icon: '🏠', transactions: 1, total: 800, color: '#22c55e' },
    { id: 'cat_107', name: 'Healthcare', icon: '🏥', transactions: 4, total: 180, color: '#14b8a6' },
    { id: 'cat_108', name: 'Education', icon: '📚', transactions: 2, total: 150, color: '#06b6d4' },
];

const totalIncome = incomeCategories.reduce((sum, cat) => sum + cat.total, 0);
const totalExpense = expenseCategories.reduce((sum, cat) => sum + cat.total, 0);

export default function CategoriesPage() {
    return (
        <DashboardLayout title="Categories" subtitle="Organize your transactions">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="bg-income/5 border-income/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-foreground-muted mb-1">Income Categories</p>
                            <p className="text-3xl font-bold text-income">
                                ${totalIncome.toLocaleString()}
                            </p>
                            <p className="text-sm text-foreground-muted mt-1">
                                {incomeCategories.length} categories
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-income/10 flex items-center justify-center">
                            <Icons.TrendingUp className="w-7 h-7 text-income" />
                        </div>
                    </div>
                </Card>

                <Card className="bg-expense/5 border-expense/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-foreground-muted mb-1">Expense Categories</p>
                            <p className="text-3xl font-bold text-expense">
                                ${totalExpense.toLocaleString()}
                            </p>
                            <p className="text-sm text-foreground-muted mt-1">
                                {expenseCategories.length} categories
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-expense/10 flex items-center justify-center">
                            <Icons.TrendingDown className="w-7 h-7 text-expense" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Income Categories */}
            <Card className="mb-6">
                <Card.Header>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-income" />
                        Income Categories
                    </div>
                    <Button variant="ghost" size="sm" icon={<Icons.Plus className="w-4 h-4" />}>
                        Add Category
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {incomeCategories.map((category) => (
                            <div
                                key={category.id}
                                className="p-4 rounded-xl bg-background-tertiary/50 hover:bg-background-tertiary transition-colors cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="text-3xl">{category.icon}</div>
                                    <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-background-secondary transition-all">
                                        <Icons.DotsVertical className="w-4 h-4 text-foreground-muted" />
                                    </button>
                                </div>
                                <h4 className="font-medium text-foreground mb-1">{category.name}</h4>
                                <p className="text-lg font-bold text-income mb-1">
                                    +${category.total.toLocaleString()}
                                </p>
                                <p className="text-xs text-foreground-muted">
                                    {category.transactions} transactions
                                </p>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>

            {/* Expense Categories */}
            <Card>
                <Card.Header>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-expense" />
                        Expense Categories
                    </div>
                    <Button variant="ghost" size="sm" icon={<Icons.Plus className="w-4 h-4" />}>
                        Add Category
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {expenseCategories.map((category) => (
                            <div
                                key={category.id}
                                className="p-4 rounded-xl bg-background-tertiary/50 hover:bg-background-tertiary transition-colors cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="text-3xl">{category.icon}</div>
                                    <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-background-secondary transition-all">
                                        <Icons.DotsVertical className="w-4 h-4 text-foreground-muted" />
                                    </button>
                                </div>
                                <h4 className="font-medium text-foreground mb-1">{category.name}</h4>
                                <p className="text-lg font-bold text-expense mb-1">
                                    -${category.total.toLocaleString()}
                                </p>
                                <p className="text-xs text-foreground-muted">
                                    {category.transactions} transactions
                                </p>
                            </div>
                        ))}

                        {/* Add Category Card */}
                        <div className="p-4 rounded-xl border-2 border-dashed border-border hover:border-primary-500 bg-transparent cursor-pointer group transition-colors">
                            <div className="flex flex-col items-center justify-center h-full min-h-[120px] text-foreground-muted group-hover:text-primary-500">
                                <Icons.Plus className="w-8 h-8 mb-2" />
                                <p className="text-sm font-medium">Add Category</p>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </DashboardLayout>
    );
}
