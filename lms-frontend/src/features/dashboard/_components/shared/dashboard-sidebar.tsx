import { Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Settings, LogOut } from 'lucide-react'

import type { DashboardConfig } from '../../_types/dashboard.types'
import { useLogout } from '#/features/auth/_hooks/useLogout'

export function DashboardSidebar({ config }: { config: DashboardConfig }) {
  const { mutate: logout, isPending: isLoggingOut } = useLogout()

  return (
    <aside className="hidden lg:flex flex-col w-80 h-screen sticky top-0 bg-sidebar border-r border-sidebar-border shrink-0">
      <div className="flex flex-col gap-3 px-4 sm:px-6 py-5 sm:py-6 pb-3 sm:pb-4 border-b border-sidebar-border">
        <Link to="/" className="no-underline!">
          <div className="flex items-center gap-3">
            <div className="size-9 sm:size-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-sm shrink-0">
              E
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground">{config.brandName}</span>
              <span className="text-xs text-muted-foreground font-semibold">{config.brandSubtitle}</span>
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex flex-col px-3 sm:px-4 gap-1 flex-1 overflow-y-auto mt-4">
        {config.navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              to={item.href}
              activeProps={{
                className: 'bg-accent text-accent-foreground font-bold',
              }}
              inactiveProps={{
                className: 'text-muted-foreground hover:bg-accent/50',
              }}
              activeOptions={{ exact: item.href === '/dashboard' }}
              className="flex items-center gap-3 px-3 sm:px-4 py-2.5 rounded-lg text-sm font-medium transition-all no-underline!"
            >
              <Icon className="size-4 sm:size-5" />
              {item.label}
            </Link>
          )
        })}
        {config.ctaLabel && (
          <div className="px-3 sm:px-4 mb-3 sm:mb-4 mt-2">
            <Button asChild className="w-full">
              <Link className="w-full no-underline!" to={config.ctaHref}>
                {config.ctaLabel}
              </Link>
            </Button>
          </div>
        )}
      </nav>

      <div className="p-3 sm:p-4 flex flex-col gap-1 mt-auto border-t border-sidebar-border">
        <Link
          to="/dashboard/settings"
          activeProps={{
            className: 'bg-accent text-accent-foreground font-bold',
          }}
          inactiveProps={{
            className: 'text-muted-foreground hover:bg-accent/50',
          }}
          className="flex justify-start items-center gap-3 px-3 sm:px-4 py-2 transition-all rounded-lg text-sm font-medium no-underline!"
        >
          <Settings className="size-4 sm:size-5" />
          Settings
        </Link>
        <Button
          variant="ghost"
          className="justify-start gap-3 px-3! sm:px-4! py-2 text-destructive hover:text-destructive hover:bg-destructive/10 h-auto font-medium text-sm w-full"
          onClick={() => {
            logout()
          }}
          disabled={isLoggingOut}
        >
          <LogOut className="size-4 sm:size-5" />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    </aside>
  )
}
