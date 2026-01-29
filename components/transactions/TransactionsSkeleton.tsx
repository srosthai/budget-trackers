export function TransactionsSkeleton() {
    return (
        <div className="space-y-6 px-4 pt-4 animate-pulse">
            {/* Date Header */}
            <div className="w-24 h-4 bg-[#1a2a1a] rounded mb-3" />

            {/* List */}
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 py-4 px-4 bg-[#1a2a1a]/40 rounded-xl">
                        <div className="w-12 h-12 rounded-2xl bg-[#1a2a1a]" />
                        <div className="flex-1 space-y-2">
                            <div className="w-32 h-4 bg-[#1a2a1a] rounded" />
                            <div className="w-20 h-3 bg-[#1a2a1a] rounded" />
                        </div>
                        <div className="w-16 h-4 bg-[#1a2a1a] rounded" />
                    </div>
                ))}
            </div>

            {/* Date Header 2 */}
            <div className="w-24 h-4 bg-[#1a2a1a] rounded mt-8 mb-3" />

            <div className="space-y-3">
                {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-4 py-4 px-4 bg-[#1a2a1a]/40 rounded-xl">
                        <div className="w-12 h-12 rounded-2xl bg-[#1a2a1a]" />
                        <div className="flex-1 space-y-2">
                            <div className="w-32 h-4 bg-[#1a2a1a] rounded" />
                            <div className="w-20 h-3 bg-[#1a2a1a] rounded" />
                        </div>
                        <div className="w-16 h-4 bg-[#1a2a1a] rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
