// =====================================================
// USE RECURRING RULES HOOK
// =====================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { RecurringRule } from '@/app/api/recurring/route';

interface UseRecurringRulesReturn {
    rules: RecurringRule[];
    isLoading: boolean;
    error: string | null;
    addRule: (data: Partial<RecurringRule>) => Promise<boolean>;
    deleteRule: (id: string) => Promise<boolean>;
    refresh: () => Promise<void>;
}

export function useRecurringRules(): UseRecurringRulesReturn {
    const [rules, setRules] = useState<RecurringRule[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRules = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/recurring');
            if (!res.ok) throw new Error('Failed to fetch recurring rules');

            const data = await res.json();
            setRules(data.rules || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addRule = async (data: Partial<RecurringRule>) => {
        try {
            const res = await fetch('/api/recurring', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to create rule');
            await fetchRules();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const deleteRule = async (id: string) => {
        // Not implemented API side yet, but hook prepared
        console.warn("Delete Recurring Rule API not implemented yet");
        return false;
    };

    useEffect(() => {
        fetchRules();
    }, [fetchRules]);

    return {
        rules,
        isLoading,
        error,
        addRule,
        deleteRule,
        refresh: fetchRules
    };
}
