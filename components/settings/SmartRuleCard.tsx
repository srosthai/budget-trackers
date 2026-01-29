// =====================================================
// SMART RULE CARD
// =====================================================

'use client';

import { Icons } from '@/components/ui';

interface SmartRuleCardProps {
    pattern: string;
    categoryName: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function SmartRuleCard({ pattern, categoryName, onEdit, onDelete }: SmartRuleCardProps) {
    return (
        <div className="p-4 bg-[#1a2a1a] border border-[#2a3f2a] rounded-xl mb-3 flex items-center justify-between group">
            <div className="flex-1">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    <span>If Vendor Contains</span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono normal-case">
                        {pattern || '""'}
                    </span>
                    <Icons.ArrowRight className="w-3 h-3" />
                    <span>Set To</span>
                </div>

                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${categoryName.includes('Unknown')
                            ? 'bg-red-500/20 text-red-500 border-red-500/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }`}>
                        {categoryName}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                {onEdit && (
                    <button
                        onClick={onEdit}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <Icons.Pencil className="w-4 h-4" />
                    </button>
                )}
                {onDelete && (
                    <button
                        onClick={onDelete}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <Icons.Trash className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
