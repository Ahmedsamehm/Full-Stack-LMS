export interface LessonItem {
  id: string
  title: string
  duration: string
  type: 'video' | 'assignment'
  dueDate?: string
}
