// =====================================================
// USE DASHBOARD HOOK
// 
// Fetches and manages dashboard data
// Separates data logic from UI
// =====================================================

'use client';

import { useState, useEffect, useCallback } from 'react';

interface DashboardStats {
    income: { amount: number; change: number };
    expense: { amount: number; change: number };
    netProfit: { amount: number };
    totalBalance: { amount: number };
}

interface Account {
    accountId: string;
    name: string;
    type: string;
    currency: string;
    currentBalance: number;
    color: string;
}

interface Transaction {
    transactionId: string;
    type: 'income' | 'expense';
    date: string;
    amount: number;
    categoryId: string;
    note: string;
}

interface UseDashboardReturn {
    // Data
    stats: DashboardStats | null;
    accounts: Account[];
    recentTransactions: Transaction[];
    month: string;

    // State
    isLoading: boolean;
    error: string | null;
    showBalance: boolean;

    // Actions
    setMonth: (month: string) => void;
    toggleBalanceVisibility: () => void;
    refresh: () => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
    const [month, setMonth] = useState(() => {
        return new Date().toISOString().slice(0, 7); // YYYY-MM
    });
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showBalance, setShowBalance] = useState(true);

    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/dashboard/stats?month=${month}`);

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data');
            }

            const data = await response.json();

            setStats(data.stats);
            setAccounts(data.accounts || []);
            setRecentTransactions(data.recentTransactions || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            // Set default data on error
            setStats({
                income: { amount: 0, change: 0 },
                expense: { amount: 0, change: 0 },
                netProfit: { amount: 0 },
                totalBalance: { amount: 0 },
            });
        } finally {
            setIsLoading(false);
        }
    }, [month]);

    const toggleBalanceVisibility = useCallback(() => {
        setShowBalance((prev) => !prev);
    }, []);

    const refresh = useCallback(async () => {
        await fetchDashboardData();
    }, [fetchDashboardData]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return {
        stats,
        accounts,
        recentTransactions,
        month,
        isLoading,
        error,
        showBalance,
        setMonth,
        toggleBalanceVisibility,
        refresh,
    };
}
