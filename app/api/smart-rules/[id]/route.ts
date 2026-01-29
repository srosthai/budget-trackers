// =====================================================
// SINGLE SMART RULE API
// 
// GET    /api/smart-rules/[id]  - Get rule by ID
// PUT    /api/smart-rules/[id]  - Update rule
// DELETE /api/smart-rules/[id]  - Delete rule
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getRowById, updateRow, deleteRow, SHEETS } from '@/lib/sheets';
import { SmartRule } from '../route';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET - Get single rule
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth();
        const { id } = await params;

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const rule = await getRowById<SmartRule>(SHEETS.SMART_RULES, 'ruleId', id);

        if (!rule) {
            return NextResponse.json({ error: 'Rule not found' }, { status: 404 });
        }

        if (rule.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        return NextResponse.json({ rule });
    } catch (error) {
        console.error('Error fetching rule:', error);
        return NextResponse.json(
            { error: 'Failed to fetch rule' },
            { status: 500 }
        );
    }
}

// PUT - Update rule
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth();
        const { id } = await params;

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const rule = await getRowById<SmartRule>(SHEETS.SMART_RULES, 'ruleId', id);

        if (!rule) {
            return NextResponse.json({ error: 'Rule not found' }, { status: 404 });
        }

        if (rule.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const updates: Partial<SmartRule> = {};

        if (body.pattern !== undefined) updates.pattern = body.pattern;
        if (body.categoryId !== undefined) updates.categoryId = body.categoryId;
        if (body.active !== undefined) updates.active = body.active;

        const updatedRule = await updateRow<SmartRule>(
            SHEETS.SMART_RULES,
            'ruleId',
            id,
            updates
        );

        return NextResponse.json({ success: true, rule: updatedRule });
    } catch (error) {
        console.error('Error updating rule:', error);
        return NextResponse.json(
            { error: 'Failed to update rule' },
            { status: 500 }
        );
    }
}

// DELETE - Delete rule
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth();
        const { id } = await params;

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const rule = await getRowById<SmartRule>(SHEETS.SMART_RULES, 'ruleId', id);

        if (!rule) {
            return NextResponse.json({ error: 'Rule not found' }, { status: 404 });
        }

        if (rule.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await deleteRow(SHEETS.SMART_RULES, 'ruleId', id);

        return NextResponse.json({ success: true, message: 'Rule deleted' });
    } catch (error) {
        console.error('Error deleting rule:', error);
        return NextResponse.json(
            { error: 'Failed to delete rule' },
            { status: 500 }
        );
    }
}
