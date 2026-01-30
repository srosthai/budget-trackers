// =====================================================
// DASHBOARD STATS API
// 
// GET /api/dashboard/stats - Get dashboard statistics
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getRowsWhere, SHEETS } from '@/lib/sheets';

interface Transaction {
    [key: string]: unknown;
    transactionId: string;
    userId: string;
    type: 'income' | 'expense';
    date: string;
    amount: number;
    categoryId: string;
    createdAt?: string;
}

// Calculate hourly spending for today (6 time slots: 6AM, 10AM, 2PM, 6PM, 10PM, Now)
function calculateHourlySpending(transactions: Transaction[]): number[] {
    const slots: number[] = [0, 0, 0, 0, 0, 0];
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    // Filter today's expenses
    const todayExpenses = transactions.filter(t =>
        t.type === 'expense' && t.date.startsWith(todayStr)
    );

    // Time slot boundaries (hours)
    // Slot 0: 0-6 (before 6AM)
    // Slot 1: 6-10 (6AM-10AM)
    // Slot 2: 10-14 (10AM-2PM)
    // Slot 3: 14-18 (2PM-6PM)
    // Slot 4: 18-22 (6PM-10PM)
    // Slot 5: 22-24 (10PM-Now)

    todayExpenses.forEach(t => {
        // Use createdAt if available, otherwise try to parse date
        const timestamp = t.createdAt ? new Date(t.createdAt) : new Date(t.date);
        const hour = timestamp.getHours();

        let slotIndex: number;
        if (hour < 6) slotIndex = 0;
        else if (hour < 10) slotIndex = 1;
        else if (hour < 14) slotIndex = 2;
        else if (hour < 18) slotIndex = 3;
        else if (hour < 22) slotIndex = 4;
        else slotIndex = 5;

        slots[slotIndex] += Number(t.amount);
    });

    return slots;
}

// Calculate weekly spending for the chart (4 weeks of current month)
function calculateWeeklySpending(transactions: Transaction[]): number[] {
    const weeks: number[] = [0, 0, 0, 0];
    const expenses = transactions.filter(t => t.type === 'expense');

    expenses.forEach(t => {
        const date = new Date(t.date);
        const dayOfMonth = date.getDate();

        let weekIndex: number;
        if (dayOfMonth <= 7) weekIndex = 0;
        else if (dayOfMonth <= 14) weekIndex = 1;
        else if (dayOfMonth <= 21) weekIndex = 2;
        else weekIndex = 3;

        weeks[weekIndex] += Number(t.amount);
    });

    return weeks;
}

// Calculate daily spending for the week (7 days)
function calculateDailySpending(transactions: Transaction[]): number[] {
    const days: number[] = [0, 0, 0, 0, 0, 0, 0];
    const now = new Date();
    const expenses = transactions.filter(t => t.type === 'expense');

    // Get the last 7 days
    for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().slice(0, 10);

        const dayExpenses = expenses.filter(t => t.date.startsWith(dateStr));
        days[6 - i] = dayExpenses.reduce((sum, t) => sum + Number(t.amount), 0);
    }

    return days;
}

// Calculate monthly spending for the year (12 months)
function calculateMonthlySpending(transactions: Transaction[]): number[] {
    const months: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const now = new Date();
    const currentYear = now.getFullYear();
    const expenses = transactions.filter(t => t.type === 'expense');

    expenses.forEach(t => {
        const date = new Date(t.date);
        if (date.getFullYear() === currentYear) {
            const monthIndex = date.getMonth();
            months[monthIndex] += Number(t.amount);
        }
    });

    return months;
}

// GET - Get dashboard statistics
export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const month = searchParams.get('month') || new Date().toISOString().slice(0, 7); // YYYY-MM

        // Get all user transactions
        const allTransactions = await getRowsWhere<Transaction>(SHEETS.TRANSACTIONS, {
            userId: session.user.id,
        });

        // Filter transactions for the specified month
        const monthTransactions = allTransactions.filter((t) => t.date.startsWith(month));

        // Calculate totals
        const income = monthTransactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const expense = monthTransactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const netProfit = income - expense;

        // Calculate Total Lifetime Balance
        const totalIncome = allTransactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const totalExpense = allTransactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const totalBalance = totalIncome - totalExpense;

        // accounts not used anymore
        const accountBalances: any[] = [];

        // Calculate previous month for comparison
        const prevMonth = new Date(month + '-01');
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        const prevMonthStr = prevMonth.toISOString().slice(0, 7);

        const prevMonthTransactions = allTransactions.filter((t) => t.date.startsWith(prevMonthStr));

        const prevIncome = prevMonthTransactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const prevExpense = prevMonthTransactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + Number(t.amount), 0);

        // Calculate percentage changes (null if no previous data to compare)
        let incomeChange: number | null = null;
        let expenseChange: number | null = null;

        if (prevIncome > 0) {
            incomeChange = ((income - prevIncome) / prevIncome) * 100;
        } else if (income > 0) {
            // New income this month, show as 100% increase
            incomeChange = 100;
        }

        if (prevExpense > 0) {
            expenseChange = ((expense - prevExpense) / prevExpense) * 100;
        } else if (expense > 0) {
            // New expense this month, show as 100% increase
            expenseChange = 100;
        }

        // Calculate profit change
        const prevProfit = prevIncome - prevExpense;
        let profitChange: number | null = null;

        if (prevProfit !== 0) {
            profitChange = ((netProfit - prevProfit) / Math.abs(prevProfit)) * 100;
        } else if (netProfit !== 0) {
            // New profit/loss this month
            profitChange = netProfit > 0 ? 100 : -100;
        }

        // Get categories to map names (both user-specific and global)
        const [userCategories, globalCategories] = await Promise.all([
            getRowsWhere<any>(SHEETS.CATEGORIES, { userId: session.user.id }),
            getRowsWhere<any>(SHEETS.CATEGORIES, { userId: 'global' }),
        ]);
        const allCategories = [...userCategories, ...globalCategories];
        const categoryMap = allCategories.reduce((acc, cat) => {
            acc[cat.categoryId] = cat.name;
            return acc;
        }, {} as Record<string, string>);

        // Get recent transactions (last 10) and attach category names
        const recentTransactions = allTransactions
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 10)
            .map(t => ({
                ...t,
                categoryName: categoryMap[t.categoryId] || 'Unknown'
            }));

        // Calculate spending data for charts
        const weeklySpending = calculateWeeklySpending(monthTransactions);
        const dailySpending = calculateDailySpending(allTransactions);
        const hourlySpending = calculateHourlySpending(allTransactions);
        const monthlySpending = calculateMonthlySpending(allTransactions);

        return NextResponse.json({
            month,
            stats: {
                income: { amount: income, change: incomeChange },
                expense: { amount: expense, change: expenseChange },
                netProfit: { amount: netProfit, change: profitChange },
                totalBalance: { amount: totalBalance },
            },
            accounts: accountBalances,
            recentTransactions,
            weeklySpending,
            dailySpending,
            hourlySpending,
            monthlySpending,
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard stats' },
            { status: 500 }
        );
    }
}
