import { Link } from '@tanstack/react-router'

import type { NavItem } from '../../_types/dashboard.types'

interface DashboardMobileTabNavProps {
  tabs: NavItem[]
}

export default function DashboardMobileTabNav({ tabs }: DashboardMobileTabNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/50 backdrop-blur-sm border-t border-outline-variant z-40 pb-safe">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Link
              key={tab.label}
              to={tab.href}
              activeProps={{
                className: 'text-primary',
              }}
              inactiveProps={{
                className: 'text-on-surface-variant',
              }}
              activeOptions={{ exact: tab.href === '/dashboard' }}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors no-underline!"
            >
              <Icon className="size-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
