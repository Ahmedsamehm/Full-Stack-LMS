import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  icon: LucideIcon
  label: string
  href: string
  active?: boolean
}

export interface DashboardConfig {
  navItems: NavItem[]
  brandName: string
  brandSubtitle: string
  ctaLabel?: string
  ctaIcon?: LucideIcon
  ctaHref?: string
}
