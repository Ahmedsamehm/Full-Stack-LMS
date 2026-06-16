import type { ApprovalItem } from '#/schemas'
import type { MonthlyRevenue } from '#/features/payments/_types/payment.types'

export interface AdminStats {
  activeUsers: number
  totalTeachers: number
  monthlyRevenue: number
  approvalQueue: number
  activeUsersChange: string
  teachersTrend: string
  revenueChange: string
}

export type { ApprovalItem, MonthlyRevenue }

export interface TextPart {
  text: string
  bold?: boolean
}

export interface ActivityItem {
  id: string
  icon: 'school' | 'person_add' | 'payments' | 'report'
  iconBg: string
  iconColor: string
  textParts: TextPart[]
  time: string
  isLast?: boolean
}

export interface AdminDashboardData {
  stats: AdminStats
  approvals: ApprovalItem[]
  activities: ActivityItem[]
  revenueData: MonthlyRevenue[]
}
