export interface TeacherStats {
  totalCourses: number
  totalStudents: number
  monthlyEarnings: number
  newCourses: number
  studentGrowth: string
  earningsGrowth: string
}

export type CourseStatus = 'published' | 'draft' | 'archived'

export interface TeacherCourse {
  id: string
  title: string
  code: string
  icon: string
  iconBg: string
  iconColor: string
  status: CourseStatus
  students: number
  lastUpdated: string
}

export interface PendingRequest {
  id: string
  studentName: string
  studentInitials?: string
  studentAvatar?: string
  time: string
  description: string
  actionLabel: string
}

export interface TeacherDashboardData {
  stats: TeacherStats
  courses: TeacherCourse[]
  pendingRequests: PendingRequest[]
}
