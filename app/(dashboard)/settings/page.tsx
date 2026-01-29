'use client';

import { DashboardLayout } from '@/components/layout';
import { Card, Icons, Button, Input } from '@/components/ui';

// =====================================================
// SETTINGS PAGE
// 
// User preferences and app settings
// =====================================================

export default function SettingsPage() {
    return (
        <DashboardLayout title="Settings" subtitle="Manage your preferences">
            <div className="max-w-3xl">
                {/* Profile Section */}
                <Card className="mb-6">
                    <Card.Header>Profile</Card.Header>
                    <Card.Body>
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold">
                                    T
                                </div>
                                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background-secondary border border-border flex items-center justify-center hover:bg-background-tertiary transition-colors">
                                    <Icons.Upload className="w-4 h-4 text-foreground-muted" />
                                </button>
                            </div>

                            {/* Profile Form */}
                            <div className="flex-1 space-y-4 w-full">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input label="Full Name" defaultValue="Thai" />
                                    <Input label="Email" type="email" defaultValue="thai@example.com" disabled />
                                </div>
                                <Button variant="primary">Save Changes</Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                {/* Preferences Section */}
                <Card className="mb-6">
                    <Card.Header>Preferences</Card.Header>
                    <Card.Body className="space-y-6">
                        {/* Currency */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-medium text-foreground">Currency</p>
                                <p className="text-sm text-foreground-muted">Set your default currency</p>
                            </div>
                            <select className="h-10 px-4 bg-background-tertiary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-auto">
                                <option value="USD">USD ($)</option>
                                <option value="KHR">KHR (៛)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </div>

                        <div className="border-t border-border" />

                        {/* Language */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-medium text-foreground">Language</p>
                                <p className="text-sm text-foreground-muted">Choose your preferred language</p>
                            </div>
                            <select className="h-10 px-4 bg-background-tertiary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-auto">
                                <option value="en">🇺🇸 English</option>
                                <option value="km">🇰🇭 ភាសាខ្មែរ (Khmer)</option>
                            </select>
                        </div>

                        <div className="border-t border-border" />

                        {/* Timezone */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-medium text-foreground">Timezone</p>
                                <p className="text-sm text-foreground-muted">Your local timezone</p>
                            </div>
                            <select className="h-10 px-4 bg-background-tertiary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-auto">
                                <option value="Asia/Phnom_Penh">Asia/Phnom_Penh (GMT+7)</option>
                                <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
                                <option value="America/New_York">America/New_York (GMT-5)</option>
                                <option value="Europe/London">Europe/London (GMT+0)</option>
                            </select>
                        </div>

                        <div className="border-t border-border" />

                        {/* Month Start Day */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-medium text-foreground">Month Start Day</p>
                                <p className="text-sm text-foreground-muted">When your budget month begins</p>
                            </div>
                            <select className="h-10 px-4 bg-background-tertiary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-auto">
                                <option value="1">1st of the month</option>
                                <option value="15">15th of the month</option>
                                <option value="25">25th of the month</option>
                            </select>
                        </div>
                    </Card.Body>
                </Card>

                {/* Data Management */}
                <Card className="mb-6">
                    <Card.Header>Data Management</Card.Header>
                    <Card.Body className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-background-tertiary rounded-xl">
                            <div>
                                <p className="font-medium text-foreground">Export Data</p>
                                <p className="text-sm text-foreground-muted">Download all your transactions as CSV</p>
                            </div>
                            <Button variant="secondary" icon={<Icons.Download className="w-4 h-4" />}>
                                Export
                            </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-background-tertiary rounded-xl">
                            <div>
                                <p className="font-medium text-foreground">Import Data</p>
                                <p className="text-sm text-foreground-muted">Upload transactions from CSV file</p>
                            </div>
                            <Button variant="secondary" icon={<Icons.Upload className="w-4 h-4" />}>
                                Import
                            </Button>
                        </div>
                    </Card.Body>
                </Card>

                {/* Danger Zone */}
                <Card className="border-expense/30">
                    <Card.Header>
                        <span className="text-expense">Danger Zone</span>
                    </Card.Header>
                    <Card.Body>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-expense/5 rounded-xl">
                            <div>
                                <p className="font-medium text-foreground">Delete Account</p>
                                <p className="text-sm text-foreground-muted">Permanently delete your account and all data</p>
                            </div>
                            <Button variant="danger">
                                Delete Account
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </DashboardLayout>
    );
}
