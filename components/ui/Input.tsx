import { InputHTMLAttributes, forwardRef } from 'react';

// =====================================================
// INPUT COMPONENT
// 
// Usage:
// <Input placeholder="Email" />
// <Input type="password" label="Password" />
// <Input error="This field is required" />
// <Input icon={<SearchIcon />} />
// =====================================================

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className = '',
            label,
            error,
            hint,
            icon,
            iconPosition = 'left',
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

        return (
            <div className="w-full">
                {/* Label */}
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-foreground mb-1.5"
                    >
                        {label}
                    </label>
                )}

                {/* Input Container */}
                <div className="relative">
                    {/* Left Icon */}
                    {icon && iconPosition === 'left' && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted">
                            {icon}
                        </span>
                    )}

                    {/* Input Field */}
                    <input
                        ref={ref}
                        id={inputId}
                        className={`
              w-full h-10 px-4 
              bg-background-secondary
              text-foreground placeholder:text-foreground-subtle
              border rounded-lg
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-expense focus:ring-expense' : 'border-border hover:border-border-hover'}
              ${icon && iconPosition === 'left' ? 'pl-10' : ''}
              ${icon && iconPosition === 'right' ? 'pr-10' : ''}
              ${className}
            `}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                        {...props}
                    />

                    {/* Right Icon */}
                    {icon && iconPosition === 'right' && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted">
                            {icon}
                        </span>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <p
                        id={`${inputId}-error`}
                        className="mt-1.5 text-sm text-expense flex items-center gap-1"
                        role="alert"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}

                {/* Hint Text */}
                {hint && !error && (
                    <p
                        id={`${inputId}-hint`}
                        className="mt-1.5 text-sm text-foreground-muted"
                    >
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
