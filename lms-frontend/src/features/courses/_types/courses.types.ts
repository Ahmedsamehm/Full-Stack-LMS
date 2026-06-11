export interface CourseInstructor {
  name: string
  initials: string
  rating: number
  reviewCount: number
}

export interface CourseListItem {
  id: string
  slug: string
  category: string
  title: string
  description: string
  price: number
  originalPrice?: number
  instructor: CourseInstructor
}

export interface CategoryOption {
  slug: string
  name: string
}

export interface CourseDetailLesson {
  id: string
  title: string
  duration: number
  orderIndex: number
  description: string
  pdfUrl?: string
}

export interface CourseDetail {
  id: string
  slug: string
  category: string
  title: string
  description: string
  price: number
  originalPrice?: number
  instructor: CourseInstructor
  thumbnailUrl?: string
  totalDuration: number
  totalLessons: number
  stats: { enrollments: number }
  objectives: string[]
  lessons: CourseDetailLesson[]
  teacherBio: string
  teacherInitials: string
}

// ─── Detail Page Component Props ──────────────────────────────────────────────

export interface CourseDetailPageProps {
  id: string
}

export interface CourseHeroProps {
  course: CourseDetail
}

export interface CourseAboutProps {
  description: string
}

export interface CourseObjectivesProps {
  objectives: string[]
}

export interface CourseCurriculumProps {
  lessons: CourseDetailLesson[]
  totalLessons: number
  totalDuration: number
}

export interface CourseInstructorBioProps {
  name: string
  initials: string
  rating: number
  reviewCount: number
  bio: string
}

export interface CourseInstructorCoursesProps {
  instructorName: string
  currentCourseId: string
}

export interface CourseSidebarCardProps {
  price: number
  originalPrice?: number
  totalLessons: number
  totalDuration: number
  enrollments: number
}

export interface CourseStatsProps {
  totalLessons: number
  totalDuration: number
  enrollments: number
}

export interface CourseMobileCtaProps {
  price: number
}
