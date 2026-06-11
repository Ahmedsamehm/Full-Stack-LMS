export interface ContinueLearning {
  id: string
  title: string
  description: string
  category: string
  thumbnail: string
  currentModule: number
  totalModules: number
  progress: number
}

export interface StudentCourse {
  id: string
  title: string
  instructor: string
  icon: string
  iconBg: string
  iconColor: string
  progress: number
}

export interface RecommendedCourse {
  id: string
  title: string
  description?: string
  thumbnail: string
  tags?: string[]
  rating?: number
  reviews?: string
  level?: string
  type: 'large' | 'small'
}

export interface StudentDashboardData {
  continueLearning: ContinueLearning
  courses: StudentCourse[]
  recommended: RecommendedCourse[]
}
