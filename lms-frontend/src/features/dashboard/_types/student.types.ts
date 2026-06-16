import type { ContinueLearning, StudentCourse, RecommendedCourse } from '#/schemas'

export type { ContinueLearning, StudentCourse, RecommendedCourse }

export interface StudentDashboardData {
  continueLearning: ContinueLearning
  courses: StudentCourse[]
  recommended: RecommendedCourse[]
}
