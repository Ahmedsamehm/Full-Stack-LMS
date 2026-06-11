export type StudentStatus = 'ACTIVE' | 'INACTIVE'

export interface EnrolledCourse {
  name: string
  progress: number
}

export interface Student {
  id: string
  name: string
  studentId: string
  email: string
  avatar?: string
  initials: string
  enrolledCourses: EnrolledCourse[]
  lastActive: string
  status: StudentStatus
}

export interface StudentsPageData {
  students: Student[]
  totalCount: number
}
