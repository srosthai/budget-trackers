// =====================================================
// CONFIRM MODAL COMPONENT
// 
// Reusable dialog for confirmations (Delete, etc.)
// =====================================================

'use client';

import { Icons } from './Icons';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'default';
    isLoading?: boolean;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    isLoading = false,
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm bg-[#0a0f0a] border border-[#1a2f1a] rounded-2xl p-6 shadow-2xl animate-scale-up">

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-full shrink-0 ${variant === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-[#22c55e]/10 text-[#22c55e]'
                        }`}>
                        {variant === 'danger' ? (
                            <Icons.Trash className="w-6 h-6" />
                        ) : (
                            <Icons.Check className="w-6 h-6" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 h-11 rounded-xl border border-[#2a3f2a] text-gray-400 hover:text-white hover:bg-white/5 font-medium transition-colors disabled:opacity-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex-1 h-11 rounded-xl font-bold text-[#0a0f0a] transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${variant === 'danger'
                                ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]'
                                : 'bg-[#22c55e] hover:bg-[#16a34a] shadow-[0_0_20px_-5px_rgba(34,197,94,0.3)]'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                Processing
                            </>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
