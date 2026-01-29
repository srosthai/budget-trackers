// =====================================================
// TYPE DEFINITIONS - BUDGET
// =====================================================

export interface Budget {
    budgetId: string;
    userId: string;
    month: string; // Format: YYYY-MM
    categoryId: string;
    limitAmount: number;
    spentAmount?: number; // Computed from transactions
    createdAt: string;
    updatedAt: string;
}

export interface BudgetFormData {
    month: string;
    categoryId: string;
    limitAmount: number;
}

export interface BudgetWithProgress extends Budget {
    percentage: number;
    remaining: number;
    isOverBudget: boolean;
    isNearLimit: boolean;
}
