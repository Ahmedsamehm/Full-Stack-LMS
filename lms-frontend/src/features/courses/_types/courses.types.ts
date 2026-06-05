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
