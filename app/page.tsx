import Link from 'next/link';

// =====================================================
// HOME PAGE
// 
// Landing page with redirect to dashboard or login
// =====================================================

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground">Budget Tracker</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary-500/10 text-primary-500 text-sm font-medium rounded-full mb-6">
              Free & Open Source
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Take control of your{' '}
              <span className="gradient-text">finances</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground-muted mb-10 leading-relaxed">
              A simple, beautiful budget tracker that helps you manage your income, expenses,
              and savings. Track everything in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-primary-500/25"
              >
                Start Free Today
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-background-tertiary hover:bg-border text-foreground font-medium rounded-xl transition-colors"
              >
                View Demo Dashboard
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="p-6 bg-background-secondary border border-border rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-income/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-income" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Track Income</h3>
              <p className="text-foreground-muted">Record all your income sources with categories and accounts.</p>
            </div>

            <div className="p-6 bg-background-secondary border border-border rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-expense/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-expense" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Monitor Expenses</h3>
              <p className="text-foreground-muted">See where your money goes with detailed expense tracking.</p>
            </div>

            <div className="p-6 bg-background-secondary border border-border rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Budget Insights</h3>
              <p className="text-foreground-muted">Get powerful dashboards and charts to understand your finances.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-foreground-muted text-sm">
            © 2026 Budget Tracker. Built with ❤️ for personal finance management.
          </p>
        </div>
      </footer>
    </div>
  );
}
