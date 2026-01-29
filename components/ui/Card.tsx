import { ReactNode } from 'react';

// =====================================================
// CARD COMPONENT
// 
// Usage:
// <Card>Content</Card>
// <Card variant="glass">Glass Card</Card>
// <Card hover>Hoverable Card</Card>
// <Card.Header>Title</Card.Header>
// <Card.Body>Content</Card.Body>
// =====================================================

export interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'outline';
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

function Card({
    children,
    className = '',
    variant = 'default',
    hover = false,
    padding = 'md',
}: CardProps) {
    const variants = {
        default: 'bg-background-secondary border border-border',
        glass: 'glass',
        outline: 'bg-transparent border border-border',
    };

    const paddings = {
        none: '',
        sm: 'p-3',
        md: 'p-4 md:p-6',
        lg: 'p-6 md:p-8',
    };

    return (
        <div
            className={`
        rounded-xl
        ${variants[variant]}
        ${paddings[padding]}
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

// Card Header
interface CardHeaderProps {
    children: ReactNode;
    className?: string;
    action?: ReactNode;
}

function CardHeader({ children, className = '', action }: CardHeaderProps) {
    return (
        <div className={`flex items-center justify-between mb-4 ${className}`}>
            <h3 className="text-lg font-semibold text-foreground">{children}</h3>
            {action && <div>{action}</div>}
        </div>
    );
}

// Card Body
interface CardBodyProps {
    children: ReactNode;
    className?: string;
}

function CardBody({ children, className = '' }: CardBodyProps) {
    return <div className={className}>{children}</div>;
}

// Card Footer
interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

function CardFooter({ children, className = '' }: CardFooterProps) {
    return (
        <div className={`mt-4 pt-4 border-t border-border ${className}`}>
            {children}
        </div>
    );
}

// Compound component pattern
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
