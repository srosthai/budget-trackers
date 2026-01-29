'use client';

import Link from 'next/link';
import { Icons, Button, Input } from '@/components/ui';

// =====================================================
// REGISTER PAGE
// 
// User registration with email/password and Google
// =====================================================

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-background flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-12 flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <Icons.BankNotes className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Budget Tracker</h1>
                            <p className="text-primary-200 text-sm">Track your finances</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-white leading-tight">
                        Take control of your finances today
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Icons.ChartBar className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Track Everything</p>
                                <p className="text-primary-200 text-sm">Monitor income, expenses, and transfers across all your accounts</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Icons.Tag className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Categorize Smart</p>
                                <p className="text-primary-200 text-sm">Custom categories to organize your spending your way</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Icons.TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Insights That Matter</p>
                                <p className="text-primary-200 text-sm">See where your money goes with powerful dashboards</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-primary-300 text-sm">
                    © 2026 Budget Tracker. All rights reserved.
                </p>
            </div>

            {/* Right Side - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                            <Icons.BankNotes className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Budget Tracker</h1>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-2">Create an account</h2>
                        <p className="text-foreground-muted">Start tracking your finances for free</p>
                    </div>

                    {/* Google Signup */}
                    <Button
                        variant="outline"
                        fullWidth
                        className="mb-6 h-12"
                        icon={
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        }
                    >
                        Continue with Google
                    </Button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-background text-foreground-muted">or register with email</span>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <form className="space-y-4">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            icon={<Icons.User className="w-4 h-4" />}
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            icon={<Icons.User className="w-4 h-4" />}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            hint="At least 8 characters"
                            icon={<Icons.Eye className="w-4 h-4" />}
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="••••••••"
                            icon={<Icons.Eye className="w-4 h-4" />}
                        />

                        <label className="flex items-start gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 mt-0.5 rounded border-border bg-background-tertiary text-primary-500 focus:ring-primary-500"
                            />
                            <span className="text-sm text-foreground-muted">
                                I agree to the{' '}
                                <Link href="/terms" className="text-primary-500 hover:text-primary-600">
                                    Terms of Service
                                </Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="text-primary-500 hover:text-primary-600">
                                    Privacy Policy
                                </Link>
                            </span>
                        </label>

                        <Button type="submit" fullWidth className="h-12">
                            Create Account
                        </Button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-foreground-muted mt-6">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
