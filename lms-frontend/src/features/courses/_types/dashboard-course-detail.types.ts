export interface InstructorInfo {
  name: string
  title: string
  avatar: string
}

export interface CourseResource {
  id: string
  name: string
  type: 'pdf' | 'doc' | 'text'
  icon: string
  iconColor: string
}

export interface ResourceSection {
  title: string
  resources: CourseResource[]
}

export interface LessonItem {
  id: string
  title: string
  duration: string
  type: 'video' | 'assignment'
  dueDate?: string
}

export interface SyllabusModule {
  id: string
  title: string
  subtitle: string
  isExpanded?: boolean
  lessons: LessonItem[]
}

export interface ActivityItem {
  id: string
  name: string
  action: string
  timestamp: string
  avatar?: string
  initials?: string
  avatarBg?: string
  avatarColor?: string
}

export interface DashboardCourseDetail {
  id: string
  title: string
  code: string
  semester: string
  credits: number
  category: string
  description: string
  thumbnail: string
  instructor: InstructorInfo
  stats: {
    enrolledStudents: number
    avgCompletion: number
  }
  modules: SyllabusModule[]
  resources: ResourceSection[]
  activities: ActivityItem[]
}
