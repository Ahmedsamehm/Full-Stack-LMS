import { Link } from '@tanstack/react-router'
import { ChevronRight, ExternalLink } from 'lucide-react'

import type { SettingsTab } from '../_types/settings.types'

const tabs: { id: SettingsTab; label: string; href?: string }[] = [
  { id: 'profile', label: 'Profile', href: '/dashboards/settings/profile' },
  { id: 'notifications', label: 'Notifications', href: '/dashboards/settings/notifications' },
  { id: 'security', label: 'Security', href: '/dashboards/settings/security' },
  { id: 'billing', label: 'Billing', href: '/dashboards/settings/billing' },
]

interface SettingsSidebarProps {
  activeTab: SettingsTab
}

export default function SettingsSidebar({ activeTab }: SettingsSidebarProps) {
  return (
    <nav className="flex flex-col gap-1 sticky top-0">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab

        if (tab.href) {
          return (
            <Link
              key={tab.id}
              to={tab.href}
              className={`px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors text-left no-underline! ${
                isActive
                  ? 'bg-surface-container text-primary font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <span>{tab.label}</span>
              <ExternalLink className="size-[18px] text-on-surface-variant/60" />
            </Link>
          )
        }

        return (
          <button
            key={tab.id}
            type="button"
            className={`px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors text-left ${
              isActive
                ? 'bg-surface-container text-primary font-bold'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            {tab.label}
            {isActive && <ChevronRight className="size-[18px]" />}
          </button>
        )
      })}
    </nav>
  )
}
