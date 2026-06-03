export interface Lesson {
  id: string
  courseId: string
  title: string
  duration: number
  content: string | null
  videoUrl: string | null
  orderIndex: number
  createdAt: string
}

export interface CreateLessonRequest {
  title: string
  duration: number
  content?: string
  videoUrl?: string
}

export interface UpdateLessonRequest {
  title?: string
  duration?: number
  content?: string
  videoUrl?: string
}

export interface ReorderLessonItem {
  id: string
  orderIndex: number
}

export interface ReorderLessonsRequest {
  lessons: ReorderLessonItem[]
}
