import SettingsSidebar from './settings-sidebar'
import SettingsSecurityForm from './settings-security-form'

export default function SettingsSecurityPage() {
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
          <SettingsSidebar activeTab="security" />
        </aside>

        <div className="flex-1 w-full">
          <SettingsSecurityForm />
        </div>
      </div>
    </main>
  )
}
