export interface AdminStats {
  activeUsers: number
  totalTeachers: number
  monthlyRevenue: number
  approvalQueue: number
  activeUsersChange: string
  teachersTrend: string
  revenueChange: string
}

export interface ApprovalItem {
  id: string
  courseTitle: string
  instructorName: string
  instructorInitials: string
  category: string
  submittedAgo: string
}

export interface ActivityItem {
  id: string
  icon: 'school' | 'person_add' | 'payments' | 'report'
  iconBg: string
  iconColor: string
  text: string
  time: string
  isLast?: boolean
}

export interface MonthlyRevenue {
  month: string
  revenue: number
}

export interface AdminDashboardData {
  stats: AdminStats
  approvals: ApprovalItem[]
  activities: ActivityItem[]
  revenueData: MonthlyRevenue[]
}
