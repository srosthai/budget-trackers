import { ReactNode } from 'react';

// =====================================================
// BADGE COMPONENT
// 
// Usage:
// <Badge>Default</Badge>
// <Badge variant="income">+$500</Badge>
// <Badge variant="expense">-$120</Badge>
// <Badge variant="transfer">Transfer</Badge>
// <Badge size="lg">Large Badge</Badge>
// =====================================================

export interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'income' | 'expense' | 'transfer' | 'primary' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

function Badge({
    children,
    variant = 'default',
    size = 'md',
    className = '',
}: BadgeProps) {
    const variants = {
        default: 'bg-background-tertiary text-foreground-muted',
        income: 'badge-income',
        expense: 'badge-expense',
        transfer: 'badge-transfer',
        primary: 'bg-primary-500/10 text-primary-500',
        warning: 'bg-yellow-500/10 text-yellow-500',
    };

    const sizes = {
        sm: 'px-1.5 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
    };

    return (
        <span
            className={`
        inline-flex items-center justify-center
        font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
        >
            {children}
        </span>
    );
}

export { Badge };
