import { createFileRoute, Outlet } from '@tanstack/react-router'
import {
  LayoutDashboard,
  GraduationCap,
  CalendarDays,
  Users,
  ClipboardList,
  BarChart3,
} from 'lucide-react'

import DashboardSidebar from '#/features/dashboard/_components/shared/dashboard-sidebar'
import DashboardTopbar from '#/features/dashboard/_components/shared/dashboard-topbar'
import DashboardMobileTabNav from '#/features/dashboard/_components/shared/dashboard-mobile-tab-nav'
import type {
  DashboardConfig,
  NavItem,
} from '#/features/dashboard/_types/dashboard.types'
import { useAuthStore, type Role } from '#/store/auth'

const brandSubtitle: Record<Role, string> = {
  Teacher: 'Teacher Console',
  Student: 'Student Portal',
  Admin: 'Admin Console',
}

const navItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
    active: true,
  },
  {
    icon: GraduationCap,
    label: 'Courses',
    href: '/dashboard/courses',
    active: false,
  },
  {
    icon: Users,
    label: 'Students',
    href: '/dashboard/students',
    active: false,
  },
  // { icon: ClipboardList, label: 'Assignments', href: '#', active: false },
]

const mobileTabs: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
    active: true,
  },
  {
    icon: GraduationCap,
    label: 'Courses',
    href: '/dashboard/courses',
    active: false,
  },
  {
    icon: Users,
    label: 'Students',
    href: '/dashboard/students',
    active: false,
  },
  // { icon: BarChart3, label: 'Reports', href: '#', active: false },
]

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const role = useAuthStore((s) => s.role)

  const config: DashboardConfig = {
    brandName: 'EduPro Academy',
    brandSubtitle: brandSubtitle[role],
    navItems,
  }

  return (
    <div className="min-h-screen bg-background flex w-full">
      <DashboardSidebar config={config} />
      <div className="flex-1 flex flex-col lg:ml-[280px] min-h-screen w-full pb-16 lg:pb-0">
        <DashboardTopbar />
        <Outlet />
      </div>
      <DashboardMobileTabNav tabs={mobileTabs} />
    </div>
  )
}
