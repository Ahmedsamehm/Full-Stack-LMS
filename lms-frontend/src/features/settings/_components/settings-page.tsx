import { useSettings } from '../_hooks/use-settings'

import type { SettingsTab } from '../_types/settings.types'
import SettingsSidebar from './settings-sidebar'
import SettingsProfileForm from './settings-profile-form'
import SettingsNotificationsForm from './settings-notifications-form'
import SettingsSecurityForm from './settings-security-form'
import SettingsBillingForm from './settings-billing-form'

const tabComponents: Record<
  SettingsTab,
  (props: {
    data: ReturnType<typeof useSettings>['data']
    isLoading: boolean
  }) => React.ReactNode
> = {
  profile: ({ data, isLoading }) => (
    <SettingsProfileForm profile={data?.profile} isLoading={isLoading} />
  ),
  notifications: ({ data, isLoading }) => (
    <SettingsNotificationsForm
      preferences={data?.notificationPreferences}
      isLoading={isLoading}
    />
  ),
  security: () => <SettingsSecurityForm />,
  billing: ({ data, isLoading }) => (
    <SettingsBillingForm
      invoices={data?.billingHistory}
      isLoading={isLoading}
    />
  ),
}

export default function SettingsPage() {
  const { data, isLoading } = useSettings()
  const activeTab = data?.activeTab ?? 'profile'
  const ActiveComponent = tabComponents[activeTab]

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
          Account Settings
        </h1>
        <p className="text-base text-on-surface-variant mt-2">
          Manage your personal information, security preferences, and billing
          details.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <aside className="w-full md:w-64 shrink-0">
          <SettingsSidebar activeTab={activeTab} />
        </aside>

        <div className="flex-1 w-full">
          {ActiveComponent({ data, isLoading })}
        </div>
      </div>
    </main>
  )
}
