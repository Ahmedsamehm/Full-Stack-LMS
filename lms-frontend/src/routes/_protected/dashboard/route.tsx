import { createFileRoute, Outlet } from '@tanstack/react-router'
import { LayoutDashboard, GraduationCap, Users, ShoppingBag, ClipboardList } from 'lucide-react'
import DashboardTopbar from '#/features/dashboard/_components/shared/dashboard-topbar'
import DashboardMobileTabNav from '#/features/dashboard/_components/shared/dashboard-mobile-tab-nav'
import type { DashboardConfig, NavItem } from '#/features/dashboard/_types/dashboard.types'
import { rolesEnum } from '#/schemas/enums'
import type { Roles } from '#/schemas/enums'
import { DashboardSidebar } from '#/features/dashboard/_components/shared/dashboard-sidebar'

// ── Brand subtitle per role ────────────────────────────────────────────────
const brandSubtitle: Record<Roles, string> = {
  Super_Admin: 'Super Admin Console',
  Admin: 'Admin Console',
  Teacher: 'Teacher Console',
  Student: 'Student Portal',
}

// ── Nav items per role ─────────────────────────────────────────────────────
const navItemsByRole: Record<Roles, NavItem[]> = {
  Super_Admin: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: Users, label: 'Users', href: '/dashboard/users', active: false },
    { icon: GraduationCap, label: 'Courses', href: '/dashboard/courses', active: false },
    { icon: ClipboardList, label: 'Enrollments', href: '/dashboard/enrollments', active: false },
  ],
  Admin: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: GraduationCap, label: 'Courses', href: '/dashboard/courses', active: false },
    { icon: Users, label: 'Users', href: '/dashboard/users', active: false },
    { icon: ClipboardList, label: 'Enrollments', href: '/dashboard/enrollments', active: false },
  ],
  Teacher: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: GraduationCap, label: 'Courses', href: '/dashboard/courses', active: false },
    { icon: Users, label: 'Students', href: '/dashboard/students', active: false },
  ],
  Student: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: GraduationCap, label: 'My Courses', href: '/dashboard/courses', active: false },
    { icon: ShoppingBag, label: 'Buy Courses', href: '/dashboard/buy-courses', active: false },
  ],
}

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()

  if (!user) return null
  const role = user.data.role
  // Fall back to Student nav while role is loading
  const activeRole: Roles = role ?? rolesEnum.enum.Student

  const navItems = navItemsByRole[activeRole]

  const config: DashboardConfig = {
    brandName: 'EduPro Academy',
    brandSubtitle: brandSubtitle[activeRole],
    navItems,
  }

  return (
    <div className="min-h-screen bg-background flex w-full">
      <DashboardSidebar config={config} />
      <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
        <DashboardTopbar />
        <Outlet />
      </div>
      <DashboardMobileTabNav tabs={navItems} />
    </div>
  )
}
