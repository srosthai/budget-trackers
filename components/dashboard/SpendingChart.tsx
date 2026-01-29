// =====================================================
// SPENDING CHART COMPONENT
// 
// Shows spending trend with simple line visualization
// Features: Weekly breakdown, comparison to last month
// =====================================================

'use client';

interface SpendingChartProps {
    amount: number;
    change: number;
    period?: string;
}

export function SpendingChart({ amount, change, period = 'Monthly' }: SpendingChartProps) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);

    // Mock data points for the chart
    const dataPoints = [30, 45, 35, 60, 55, 70, 65, 80, 75, 90, 85, 95];

    return (
        <div className="rounded-2xl bg-[#0f1610] p-5 border border-[#1a2f1a]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-white">Spending Trend</h3>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#1a2a1a] text-gray-400 border border-[#2a3f2a]">
                    {period}
                </span>
            </div>

            {/* Amount and Change */}
            <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-white">{formattedAmount}</span>
                <span className={`text-sm font-medium ${change <= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                    {change <= 0 ? '' : '+'}{change.toFixed(1)}% vs last month
                </span>
            </div>

            {/* Simple Line Chart */}
            <div className="relative h-24 mb-4">
                <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="40" x2="300" y2="40" stroke="#1a2f1a" strokeWidth="1" strokeDasharray="4" />

                    {/* Chart line */}
                    <path
                        d={`M ${dataPoints.map((point, i) => `${(i / (dataPoints.length - 1)) * 300},${80 - (point / 100) * 80}`).join(' L ')}`}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Gradient fill */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d={`M 0,80 L ${dataPoints.map((point, i) => `${(i / (dataPoints.length - 1)) * 300},${80 - (point / 100) * 80}`).join(' L ')} L 300,80 Z`}
                        fill="url(#chartGradient)"
                    />

                    {/* End dot */}
                    <circle
                        cx={300}
                        cy={80 - (dataPoints[dataPoints.length - 1] / 100) * 80}
                        r="4"
                        fill="#22c55e"
                    />
                </svg>
            </div>

            {/* Week Labels */}
            <div className="flex justify-between text-xs text-gray-500">
                <span>WEEK 1</span>
                <span>WEEK 2</span>
                <span>WEEK 3</span>
                <span>WEEK 4</span>
            </div>
        </div>
    );
}
