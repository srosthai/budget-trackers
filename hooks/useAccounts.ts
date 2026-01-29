// =====================================================
// USE ACCOUNTS HOOK
// 
// Fetches and manages user accounts
// =====================================================

'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Account {
    accountId: string;
    name: string;
    type: string; // 'cash', 'bank', 'ewallet', 'credit'
    currency: string;
    startingBalance: number;
    balance?: number; // Calculated balance if available
    note?: string;
    color?: string;
    transactions?: number; // Transaction count if available
    lastActivity?: string;
}

interface UseAccountsReturn {
    accounts: Account[];
    isLoading: boolean;
    error: string | null;
    totalBalance: number;
    refresh: () => Promise<void>;
    addAccount: (data: Partial<Account>) => Promise<boolean>;
    updateAccount: (id: string, data: Partial<Account>) => Promise<boolean>;
    deleteAccount: (id: string) => Promise<boolean>;
}

export function useAccounts(): UseAccountsReturn {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAccounts = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/accounts');
            if (!res.ok) throw new Error('Failed to fetch accounts');

            const data = await res.json();
            const fetchedAccounts = data.accounts || [];

            // Note: We might need to fetch balances separately or assume startingBalance is current for now
            // In a real app, balance = startingBalance + sum(transactions)
            // For now, using startingBalance as balance
            const accountsWithBalance = fetchedAccounts.map((acc: any) => ({
                ...acc,
                balance: acc.startingBalance, // Placeholder until we calculate real balance
                color: acc.color || '#22c55e'
            }));

            setAccounts(accountsWithBalance);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addAccount = async (data: Partial<Account>) => {
        try {
            const res = await fetch('/api/accounts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to create account');
            await fetchAccounts();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const updateAccount = async (id: string, data: Partial<Account>) => {
        try {
            const res = await fetch(`/api/accounts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to update account');
            await fetchAccounts();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const deleteAccount = async (id: string) => {
        try {
            const res = await fetch(`/api/accounts/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete account');
            await fetchAccounts();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);

    const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);

    return {
        accounts,
        isLoading,
        error,
        totalBalance,
        refresh: fetchAccounts,
        addAccount,
        updateAccount,
        deleteAccount,
    };
}
