// =====================================================
// SMART RULES API
// 
// GET    /api/smart-rules     - Get all user rules
// POST   /api/smart-rules     - Create new rule
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getRowsWhere, addRow, updateSheetHeaders, SHEETS } from '@/lib/sheets';
import { generateId } from '@/lib/utils';

export interface SmartRule {
    [key: string]: unknown;
    ruleId: string;
    userId: string;
    pattern: string; // Vendor name pattern (e.g. "Grab")
    categoryId: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

// GET - List all smart rules for current user
export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fix headers if necessary (Self-healing for column mismatch)
        await updateSheetHeaders(SHEETS.SMART_RULES);

        const rules = await getRowsWhere<SmartRule>(SHEETS.SMART_RULES, {
            userId: session.user.id,
        });

        return NextResponse.json({ rules });
    } catch (error) {
        console.error('Error fetching smart rules:', error);
        return NextResponse.json(
            { error: 'Failed to fetch smart rules' },
            { status: 500 }
        );
    }
}

// POST - Create new smart rule
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { pattern, categoryId } = body;

        if (!pattern || !categoryId) {
            return NextResponse.json(
                { error: 'Pattern and categoryId are required' },
                { status: 400 }
            );
        }

        const newRule: SmartRule = {
            ruleId: generateId('rule'),
            userId: session.user.id,
            pattern,
            categoryId,
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await addRow(SHEETS.SMART_RULES, newRule);

        return NextResponse.json(
            { success: true, rule: newRule },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating smart rule:', error);
        return NextResponse.json(
            { error: 'Failed to create smart rule' },
            { status: 500 }
        );
    }
}
