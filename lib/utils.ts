// =====================================================
// UTILITY FUNCTIONS
// =====================================================

import { type ClassValue, clsx } from 'clsx';

/**
 * Merge class names with clsx (tailwind-merge compatible)
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

/**
 * Format currency with proper symbol
 */
export function formatCurrency(
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US'
): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(
    date: string | Date,
    options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }
): string {
    return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Format relative date (Today, Yesterday, etc.)
 */
export function formatRelativeDate(date: string | Date): string {
    const now = new Date();
    const target = new Date(date);
    const diffDays = Math.floor((now.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return formatDate(date);
}

/**
 * Generate UUID with prefix
 */
export function generateId(prefix: string = ''): string {
    const uuid = crypto.randomUUID();
    return prefix ? `${prefix}_${uuid.slice(0, 8)}` : uuid;
}

/**
 * Parse comma-separated tags
 */
export function parseTags(tags: string): string[] {
    return tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Sleep/delay function
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
