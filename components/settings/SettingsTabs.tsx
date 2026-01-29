// =====================================================
// SETTINGS TABS (Segmented Control)
// =====================================================

'use client';

interface SettingsTabsProps {
    activeTab: 'categories' | 'rules';
    onChange: (tab: 'categories' | 'rules') => void;
}

export function SettingsTabs({ activeTab, onChange }: SettingsTabsProps) {
    return (
        <div className="p-1 bg-[#1a2a1a] rounded-xl flex items-center mb-6 border border-[#2a3f2a]">
            <button
                onClick={() => onChange('categories')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'categories'
                        ? 'bg-[#22c55e] text-[#0a0f0a] shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
            >
                Categories
            </button>
            <button
                onClick={() => onChange('rules')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'rules'
                        ? 'bg-[#22c55e] text-[#0a0f0a] shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
            >
                Smart Rules
            </button>
        </div>
    );
}
