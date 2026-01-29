import { ButtonHTMLAttributes, forwardRef } from 'react';

// =====================================================
// BUTTON COMPONENT
// 
// Usage:
// <Button>Default</Button>
// <Button variant="primary">Primary</Button>
// <Button variant="outline" size="sm">Small Outline</Button>
// <Button variant="ghost" icon={<PlusIcon />}>With Icon</Button>
// <Button loading>Loading...</Button>
// =====================================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-lg
      transition-all duration-200 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    // Variant styles
    const variants = {
      primary: `
        bg-primary-500 text-white
        hover:bg-primary-600 active:bg-primary-700
        focus-visible:ring-primary-500
        shadow-sm hover:shadow-md
      `,
      secondary: `
        bg-background-tertiary text-foreground
        hover:bg-border active:bg-border-hover
        focus-visible:ring-primary-500
        border border-border
      `,
      outline: `
        bg-transparent text-foreground
        border border-border
        hover:bg-background-tertiary hover:border-border-hover
        focus-visible:ring-primary-500
      `,
      ghost: `
        bg-transparent text-foreground-muted
        hover:bg-background-tertiary hover:text-foreground
        focus-visible:ring-primary-500
      `,
      danger: `
        bg-expense text-white
        hover:bg-red-600 active:bg-red-700
        focus-visible:ring-red-500
        shadow-sm hover:shadow-md
      `,
    };

    // Size styles
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <LoadingSpinner size={size} />
        ) : (
          <>
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Loading Spinner Component
function LoadingSpinner({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const spinnerSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <svg
      className={`animate-spin ${spinnerSizes[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export { Button };
