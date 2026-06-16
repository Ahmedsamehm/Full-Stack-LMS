import { SettingsTableSkeleton } from '#/components/loading-skeleton'
import { Switch } from '#/components/ui/switch'

import type { NotificationPreference } from '../_types/settings.types'

interface SettingsNotificationsFormProps {
  preferences?: NotificationPreference[]
  isLoading: boolean
}

export default function SettingsNotificationsForm({
  preferences,
  isLoading,
}: SettingsNotificationsFormProps) {
  if (isLoading) {
    return <SettingsTableSkeleton />
  }

  if (!preferences) return null

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="p-6 md:p-8 border-b border-outline-variant bg-surface-bright">
        <h3 className="text-lg font-semibold text-on-surface mb-1">
          Notification Preferences
        </h3>
        <p className="text-sm text-on-surface-variant">
          Choose what updates you&apos;d like to receive.
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {preferences.map((pref) => (
          <div
            key={pref.id}
            className="flex items-start justify-between gap-4 py-2"
          >
            <div>
              <p className="text-sm font-medium text-on-surface">
                {pref.label}
              </p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {pref.description}
              </p>
            </div>
            <Switch defaultChecked={pref.enabled} />
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-outline-variant bg-surface-container-low flex justify-end gap-4">
        <button
          type="button"
          className="bg-transparent text-on-surface text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-surface-container-highest transition-colors"
        >
          Discard Changes
        </button>
        <button
          type="submit"
          className="bg-primary text-on-primary text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-primary/90 shadow-sm transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  )
}
