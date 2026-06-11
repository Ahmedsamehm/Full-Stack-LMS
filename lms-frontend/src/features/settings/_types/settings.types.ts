export interface SettingsProfile {
  firstName: string
  lastName: string
  email: string
  bio: string
  avatarUrl?: string
}

export interface NotificationPreference {
  id: string
  label: string
  description: string
  enabled: boolean
}

export interface BillingInvoice {
  id: string
  date: string
  description: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
}

export type SettingsTab = 'profile' | 'notifications' | 'security' | 'billing'

export interface SettingsPageData {
  activeTab: SettingsTab
  profile: SettingsProfile
  notificationPreferences: NotificationPreference[]
  billingHistory: BillingInvoice[]
}
