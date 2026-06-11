import { Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { X, Settings, LogOut } from 'lucide-react'

import type { DashboardConfig } from '../../_types/dashboard.types'

interface DashboardSidebarProps {
  config: DashboardConfig
  isOpen?: boolean
}

export default function DashboardSidebar({ config }: DashboardSidebarProps) {
  const sidebarContent = (
    <>
      <div className="flex items-center justify-between gap-3 px-6 py-6 pb-4">
         <Link to="/" className='no-underline!'>
        <div className="flex items-center gap-3">
         
          <div className="size-10 rounded-lg bg-primary-container text-primary flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
            E
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-on-surface">
              {config.brandName}
            </span>
            <span className="text-xs text-on-surface-variant font-semibold">
              {config.brandSubtitle}
            </span>
          </div>
        
        </div>
          </Link>
      </div>
      <nav className="flex flex-col px-4 gap-1 flex-1 overflow-y-auto">
        {config.navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all no-underline! ${
                item.active
                  ? 'bg-secondary-container text-on-secondary-container font-bold'
                  : 'text-secondary hover:bg-surface-container'
              }`}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          )
        })}
        {config.ctaLabel && (
          <div className="px-4 mb-4">
            <Button asChild className="w-full">
              <Link
                className="w-full text-white! no-underline!"
                to={config.ctaHref}
              >
                {config.ctaLabel}
              </Link>
            </Button>
          </div>
        )}
      </nav>

      <div className="p-4 flex flex-col gap-1 mt-auto border-t border-outline-variant">
        <Link
          to="/dashboards/settings"
          className="flex items-center gap-3 px-4 py-2 text-secondary hover:bg-surface-container transition-all rounded-lg text-sm font-medium no-underline!"
        >
          <Settings className="size-5" />
          Settings
        </Link>
        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-2 text-error   transition-all rounded-lg text-sm font-medium no-underline!"
        >
          <LogOut className="size-5" />
          Logout
        </Link>
      </div>
    </>
  )

  return (
    <>
      <aside className="bg-surface-container-lowest border-r border-outline-variant fixed left-0 top-0 h-screen w-[280px] hidden lg:flex flex-col z-50">
        {sidebarContent}
      </aside>
    </>
  )
}
