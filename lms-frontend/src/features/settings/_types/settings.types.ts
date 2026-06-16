export interface SettingsProfile {
  id: string
  name: string
  email: string
  bio: string | null
  role: string
  status: string
  createdAt: string
  updatedAt: string
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
