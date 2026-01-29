// =====================================================
// TRANSACTIONS API
// 
// GET    /api/transactions      - Get transactions (with filters)
// POST   /api/transactions      - Create new transaction
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getRowsWhere, addRow, SHEETS } from '@/lib/sheets';
import { generateId } from '@/lib/utils';

export interface Transaction {
    [key: string]: unknown;
    transactionId: string;
    userId: string;
    type: 'income' | 'expense';
    date: string;
    amount: number;
    currency: string;
    categoryId?: string;
    note?: string;
    tags?: string;
    receiptUrl?: string;
    createdAt: string;
    updatedAt: string;
}

// GET - List transactions filterable by date range, category
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const searchParams = request.nextUrl.searchParams;
        const categoryId = searchParams.get('categoryId');
        const type = searchParams.get('type');
        const fromDate = searchParams.get('startDate'); // Match typical params
        const toDate = searchParams.get('endDate');

        const allTransactions = await getRowsWhere<Transaction>(SHEETS.TRANSACTIONS, {
            userId: session.user.id,
        });

        let filtered = allTransactions;

        if (categoryId) filtered = filtered.filter(t => t.categoryId === categoryId);
        if (type) filtered = filtered.filter(t => t.type === type);

        if (fromDate) {
            filtered = filtered.filter(t => new Date(t.date) >= new Date(fromDate));
        }
        if (toDate) {
            filtered = filtered.filter(t => new Date(t.date) <= new Date(toDate));
        }

        // Sort by date desc
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json({ transactions: filtered });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

// POST - Create transaction
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const { type, amount, date, categoryId, note, tags } = body;

        if (!type || !amount || !date) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const numAmount = Number(amount);

        const transaction: Transaction = {
            transactionId: generateId('tx'),
            userId: session.user.id,
            type,
            date,
            amount: numAmount,
            currency: body.currency || 'USD',
            categoryId,
            note: note || '',
            tags: tags || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // 1. Save Transaction
        await addRow(SHEETS.TRANSACTIONS, transaction);

        // No account balance updates needed

        return NextResponse.json({ success: true, transaction }, { status: 201 });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
