// =====================================================
// APPLICATION CONSTANTS
// =====================================================

// Supported currencies
export const CURRENCIES = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'KHR', symbol: '៛', name: 'Cambodian Riel' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'THB', symbol: '฿', name: 'Thai Baht' },
] as const;

// Supported languages
export const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'km', name: 'ភាសាខ្មែរ', flag: '🇰🇭' },
] as const;

// Timezones (common ones)
export const TIMEZONES = [
    { value: 'Asia/Phnom_Penh', label: 'Asia/Phnom_Penh (GMT+7)' },
    { value: 'Asia/Bangkok', label: 'Asia/Bangkok (GMT+7)' },
    { value: 'Asia/Singapore', label: 'Asia/Singapore (GMT+8)' },
    { value: 'America/New_York', label: 'America/New_York (GMT-5)' },
    { value: 'America/Los_Angeles', label: 'America/Los_Angeles (GMT-8)' },
    { value: 'Europe/London', label: 'Europe/London (GMT+0)' },
    { value: 'Europe/Paris', label: 'Europe/Paris (GMT+1)' },
] as const;

// Account types
export const ACCOUNT_TYPES = [
    { value: 'cash', label: 'Cash', icon: 'BankNotes' },
    { value: 'bank', label: 'Bank Account', icon: 'CreditCard' },
    { value: 'ewallet', label: 'E-Wallet', icon: 'Wallet' },
    { value: 'credit', label: 'Credit Card', icon: 'CreditCard' },
] as const;

// Transaction types
export const TRANSACTION_TYPES = [
    { value: 'income', label: 'Income', color: 'income' },
    { value: 'expense', label: 'Expense', color: 'expense' },
    { value: 'transfer', label: 'Transfer', color: 'transfer' },
] as const;

// Date presets for filters
export const DATE_PRESETS = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 days' },
    { value: 'last30days', label: 'Last 30 days' },
    { value: 'thisMonth', label: 'This month' },
    { value: 'lastMonth', label: 'Last month' },
    { value: 'thisYear', label: 'This year' },
    { value: 'custom', label: 'Custom range' },
] as const;

// Budget alert thresholds
export const BUDGET_THRESHOLDS = {
    WARNING: 80, // 80% - yellow warning
    DANGER: 100, // 100% - over budget
} as const;

// Pagination defaults
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

// API endpoints
export const API_ROUTES = {
    AUTH: '/api/auth',
    ACCOUNTS: '/api/accounts',
    CATEGORIES: '/api/categories',
    TRANSACTIONS: '/api/transactions',
    BUDGETS: '/api/budgets',
    RECURRING: '/api/recurring',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
    THEME: 'budget-tracker-theme',
    LANGUAGE: 'budget-tracker-language',
    SIDEBAR_COLLAPSED: 'budget-tracker-sidebar-collapsed',
} as const;

// Color palette for charts/accounts
export const COLOR_PALETTE = [
    '#10b981', // Emerald
    '#3b82f6', // Blue
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#84cc16', // Lime
    '#f97316', // Orange
    '#6366f1', // Indigo
] as const;
