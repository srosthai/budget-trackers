// =====================================================
// RECURRING RULES API
// 
// GET    /api/recurring     - Get all rules
// POST   /api/recurring     - Create new rule
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getRowsWhere, addRow, SHEETS } from '@/lib/sheets';
import { generateId } from '@/lib/utils';

export interface RecurringRule {
    ruleId: string;
    userId: string;
    type: 'income' | 'expense';
    amount: number;
    categoryId: string;
    accountId: string;
    frequency: 'monthly' | 'weekly';
    nextRunDate: string; // ISO Date YYYY-MM-DD
    note: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

// GET - List all recurring rules
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const rules = await getRowsWhere<RecurringRule>(SHEETS.RECURRING_RULES, {
            userId: session.user.id,
        });

        return NextResponse.json({ rules });
    } catch (error) {
        console.error('Error fetching recurring rules:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

// POST - Create new recurring rule
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const { type, amount, categoryId, accountId, frequency, startDate, note } = body;

        if (!type || !amount || !categoryId || !accountId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newRule: RecurringRule = {
            ruleId: generateId('rr'),
            userId: session.user.id,
            type,
            amount: Number(amount),
            categoryId,
            accountId,
            frequency: frequency || 'monthly',
            nextRunDate: startDate || new Date().toISOString().split('T')[0],
            note: note || '',
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await addRow(SHEETS.RECURRING_RULES, newRule);

        return NextResponse.json({ success: true, rule: newRule }, { status: 201 });
    } catch (error) {
        console.error('Error creating recurring rule:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
