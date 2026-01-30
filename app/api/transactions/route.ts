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

// Validation constants
const MAX_AMOUNT = 999999999.99; // Maximum transaction amount
const VALID_TYPES = ['income', 'expense'] as const;
const VALID_CURRENCIES = ['USD', 'KHR'] as const;
const MAX_NOTE_LENGTH = 500;
const MAX_TAGS_LENGTH = 200;

// Validation helpers
function isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

function isValidType(type: string): type is 'income' | 'expense' {
    return VALID_TYPES.includes(type as 'income' | 'expense');
}

function sanitizeString(str: string, maxLength: number): string {
    return str.trim().slice(0, maxLength);
}

// GET - List transactions filterable by date range, category
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const categoryId = searchParams.get('categoryId');
        const type = searchParams.get('type');
        const fromDate = searchParams.get('startDate');
        const toDate = searchParams.get('endDate');

        // Validate type filter if provided
        if (type && !isValidType(type)) {
            return NextResponse.json({ error: 'Invalid type filter' }, { status: 400 });
        }

        const allTransactions = await getRowsWhere<Transaction>(SHEETS.TRANSACTIONS, {
            userId: session.user.id,
        });

        let filtered = allTransactions;

        if (categoryId) filtered = filtered.filter(t => t.categoryId === categoryId);
        if (type) filtered = filtered.filter(t => t.type === type);

        if (fromDate && isValidDate(fromDate)) {
            filtered = filtered.filter(t => new Date(t.date) >= new Date(fromDate));
        }
        if (toDate && isValidDate(toDate)) {
            filtered = filtered.filter(t => new Date(t.date) <= new Date(toDate));
        }

        // Sort by date desc
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json({ transactions: filtered });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }
}

// POST - Create transaction
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { type, amount, date, categoryId, note, tags, currency } = body;

        // Validate required fields
        if (!type || amount === undefined || amount === null || !date) {
            return NextResponse.json(
                { error: 'Missing required fields: type, amount, and date are required' },
                { status: 400 }
            );
        }

        // Validate type
        if (!isValidType(type)) {
            return NextResponse.json(
                { error: 'Invalid type. Must be "income" or "expense"' },
                { status: 400 }
            );
        }

        // Validate and sanitize amount
        const numAmount = Number(amount);
        if (isNaN(numAmount)) {
            return NextResponse.json(
                { error: 'Amount must be a valid number' },
                { status: 400 }
            );
        }
        if (numAmount <= 0) {
            return NextResponse.json(
                { error: 'Amount must be greater than 0' },
                { status: 400 }
            );
        }
        if (numAmount > MAX_AMOUNT) {
            return NextResponse.json(
                { error: `Amount cannot exceed ${MAX_AMOUNT.toLocaleString()}` },
                { status: 400 }
            );
        }

        // Validate date format
        if (!isValidDate(date)) {
            return NextResponse.json(
                { error: 'Invalid date format. Use YYYY-MM-DD' },
                { status: 400 }
            );
        }

        // Validate currency if provided
        const validCurrency = currency && VALID_CURRENCIES.includes(currency) ? currency : 'USD';

        // Sanitize optional string fields
        const sanitizedNote = note ? sanitizeString(String(note), MAX_NOTE_LENGTH) : '';
        const sanitizedTags = tags ? sanitizeString(String(tags), MAX_TAGS_LENGTH) : '';

        const transaction: Transaction = {
            transactionId: generateId('tx'),
            userId: session.user.id,
            type,
            date,
            amount: Math.round(numAmount * 100) / 100, // Round to 2 decimal places
            currency: validCurrency,
            categoryId: categoryId || undefined,
            note: sanitizedNote,
            tags: sanitizedTags,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await addRow(SHEETS.TRANSACTIONS, transaction);

        return NextResponse.json({ success: true, transaction }, { status: 201 });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
    }
}
