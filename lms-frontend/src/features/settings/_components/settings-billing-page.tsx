import { useSettings } from '../_hooks/use-settings'
import SettingsSidebar from './settings-sidebar'
import SettingsBillingForm from './settings-billing-form'

export default function SettingsBillingPage() {
  const { data, isLoading } = useSettings()

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
          <SettingsSidebar activeTab={data?.activeTab ?? 'billing'} />
        </aside>

        <div className="flex-1 w-full">
          <SettingsBillingForm
            invoices={data?.billingHistory}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  )
}
