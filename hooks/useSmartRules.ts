// =====================================================
// USE SMART RULES HOOK
// 
// Fetches and manages smart categorization rules
// =====================================================

'use client';

import { useState, useEffect, useCallback } from 'react';

export interface SmartRule {
    ruleId: string;
    pattern: string;
    categoryId: string;
    active: boolean;
}

interface UseSmartRulesReturn {
    rules: SmartRule[];
    isLoading: boolean;
    error: string | null;
    addRule: (pattern: string, categoryId: string) => Promise<boolean>;
    updateRule: (id: string, data: Partial<SmartRule>) => Promise<boolean>;
    deleteRule: (id: string) => Promise<boolean>;
    refresh: () => Promise<void>;
}

export function useSmartRules(): UseSmartRulesReturn {
    const [rules, setRules] = useState<SmartRule[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRules = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/smart-rules');
            if (!res.ok) throw new Error('Failed to fetch smart rules');

            const data = await res.json();
            setRules(data.rules || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addRule = async (pattern: string, categoryId: string) => {
        try {
            const res = await fetch('/api/smart-rules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pattern, categoryId }),
            });

            if (!res.ok) throw new Error('Failed to create rule');

            await fetchRules(); // Refresh list
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const updateRule = async (id: string, data: Partial<SmartRule>) => {
        try {
            const res = await fetch(`/api/smart-rules/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to update rule');
            await fetchRules();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const deleteRule = async (id: string) => {
        try {
            const res = await fetch(`/api/smart-rules/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete rule');
            await fetchRules();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    useEffect(() => {
        fetchRules();
    }, [fetchRules]);

    return {
        rules,
        isLoading,
        error,
        addRule,
        updateRule,
        deleteRule,
        refresh: fetchRules,
    };
}
