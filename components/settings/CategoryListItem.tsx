// =====================================================
// CATEGORY LIST ITEM
// =====================================================

'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui';
import { Category } from '@/hooks/useCategories';

interface CategoryListItemProps {
    category: Category;
    onEdit?: (category: Category) => void;
    onDelete?: (category: Category) => void;
}

function getIcon(name: string) {
    if (name.toLowerCase().includes('food')) return Icons.Receipt;
    if (name.toLowerCase().includes('transport') || name.toLowerCase().includes('car')) return Icons.ArrowUp;
    if (name.toLowerCase().includes('salary')) return Icons.BankNotes;
    return Icons.Tag;
}

export function CategoryListItem({ category, onEdit, onDelete }: CategoryListItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = getIcon(category.name);

    // Color logic (from hook default based on type)
    const bg = category.color || '#22c55e';

    // Use subcategories from prop if they exist
    const hasSubcategories = category.subcategories && category.subcategories.length > 0;

    return (
        <div className="mb-2">
            <div
                className="w-full flex items-center gap-4 p-4 bg-[#1a2a1a]/50 rounded-xl hover:bg-[#1a2a1a] transition-colors cursor-pointer group"
                onClick={() => hasSubcategories && setIsOpen(!isOpen)}
            >
                {/* Icon */}
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg text-white"
                    style={{ backgroundColor: bg.startsWith('#') ? bg : undefined }}
                >
                    <div className={`${bg.startsWith('#') ? '' : bg} w-full h-full rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>

                {/* Text */}
                <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{category.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        {hasSubcategories ? (
                            <span>{category.subcategories!.length} subcategories</span>
                        ) : (
                            <span>Category</span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    {onEdit && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(category);
                            }}
                            className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="Edit"
                        >
                            <Icons.Pencil className="w-4 h-4" />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(category);
                            }}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete"
                        >
                            <Icons.Trash className="w-4 h-4" />
                        </button>
                    )}

                    {hasSubcategories && (
                        <Icons.ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    )}
                </div>
            </div>

            {/* Subcategories */}
            {isOpen && hasSubcategories && (
                <div className="pl-8 pt-2 space-y-2 border-l-2 border-[#2a3f2a] ml-6 mt-1">
                    {category.subcategories!.map(sub => (
                        <div key={sub.categoryId} className="flex items-center justify-between p-3 bg-[#1a2a1a]/20 rounded-lg hover:bg-[#1a2a1a]/40 group/sub">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                                    <Icons.Tag className="w-4 h-4" />
                                </div>
                                <span className="text-sm text-gray-300">{sub.name}</span>
                            </div>
                            <div className="flex items-center opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(sub)}
                                        className="p-1.5 text-gray-600 hover:text-white transition-colors"
                                    >
                                        <Icons.Pencil className="w-3 h-3" />
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(sub)}
                                        className="p-1.5 text-gray-600 hover:text-red-500 transition-colors"
                                    >
                                        <Icons.Trash className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
