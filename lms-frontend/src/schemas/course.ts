import { z } from 'zod'
import { courseStatusEnum } from './enums'
import { paginationParamsSchema } from './api'
import { categorySchema } from './category'
import { userSchema } from './user'

// ─── Course Schemas ───────────────────────────────────────────────────────────

export const courseCategorySchema = categorySchema.pick({
  id: true,
  name: true,
  slug: true,
})

export const courseStatsSchema = z.object({
  enrollments: z.number(),
})

export const courseTimestampsSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const courseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  thumbnailUrl: z.string().nullable(),
  teacherId: z.string().uuid(),
  status: courseStatusEnum,
  timestamps: courseTimestampsSchema,
  category: courseCategorySchema,
  stats: courseStatsSchema,
})

export const teacherRefSchema = userSchema
  .pick({
    id: true,
    name: true,
  })
  .extend({
    avatarUrl: z.string().nullable().optional(),
  })

export const lessonRefSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  duration: z.number(),
  orderIndex: z.number(),
})

export const courseDetailSchema = courseSchema.extend({
  teacher: teacherRefSchema,
  lessons: lessonRefSchema.array(),
})

export const createCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  categoryId: z.string().uuid(),
  thumbnailUrl: z.string().url().optional(),
  status: courseStatusEnum.optional(),
})

export const updateCourseSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  categoryId: z.string().uuid().optional(),
  thumbnailUrl: z.string().url().optional(),
  status: courseStatusEnum.optional(),
})

export const changeCourseStatusSchema = z.object({
  status: courseStatusEnum,
})

export const courseListParamsSchema = paginationParamsSchema.extend({
  categoryId: z.string().optional(),
  search: z.string().optional(),
  status: courseStatusEnum.optional(),
})

export const getCoursesByTeacherSchema = z.object({
  teacherId: z.string().uuid(),
  params: paginationParamsSchema,
})

export const updateCourseParamsSchema = z.object({
  id: z.string().uuid(),
  course: updateCourseSchema,
})

export const changeCourseStatusParamsSchema = z.object({
  id: z.string().uuid(),
  status: changeCourseStatusSchema,
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CourseCategory = z.infer<typeof courseCategorySchema>
export type CourseStats = z.infer<typeof courseStatsSchema>
export type CourseTimestamps = z.infer<typeof courseTimestampsSchema>
export type Course = z.infer<typeof courseSchema>
export type TeacherRef = z.infer<typeof teacherRefSchema>
export type LessonRef = z.infer<typeof lessonRefSchema>
export type CourseDetail = z.infer<typeof courseDetailSchema>
export type CreateCourseRequest = z.infer<typeof createCourseSchema>
export type UpdateCourseRequest = z.infer<typeof updateCourseSchema>
export type ChangeCourseStatusRequest = z.infer<typeof changeCourseStatusSchema>
export type CourseListParams = z.infer<typeof courseListParamsSchema>
export type GetCoursesByTeacherParams = z.infer<typeof getCoursesByTeacherSchema>
export type UpdateCourseParams = z.infer<typeof updateCourseParamsSchema>
export type ChangeCourseStatusParams = z.infer<typeof changeCourseStatusParamsSchema>

// ─── UI / Dashboard Specific Schemas ──────────────────────────────────────────

export const courseInstructorSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  initials: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
})

export const courseListItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  originalPrice: z.number().optional(),
  instructor: courseInstructorSchema,
})

export const categoryOptionSchema = z.object({
  slug: z.string(),
  name: z.string(),
})

export const courseDetailLessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.number(),
  orderIndex: z.number(),
  description: z.string(),
  pdfUrl: z.string().optional(),
})

export const courseDetailUIReadySchema = z.object({
  id: z.string(),
  slug: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  originalPrice: z.number().optional(),
  instructor: courseInstructorSchema,
  thumbnailUrl: z.string().optional(),
  totalDuration: z.number(),
  totalLessons: z.number(),
  stats: z.object({ enrollments: z.number() }),
  objectives: z.string().array(),
  lessons: courseDetailLessonSchema.array(),
  teacherBio: z.string(),
  teacherInitials: z.string(),
})

export const dashboardCourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  instructorName: z.string(),
  instructorAvatar: z.string(),
  thumbnail: z.string(),
  enrolledCount: z.number(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
  progress: z.number().optional(),
  enrollmentStatus: z.enum(['PENDING', 'ACTIVE', 'REJECTED', 'EXPIRED']).optional(),
  enrollmentId: z.string().optional(),
  description: z.string().nullable().optional(),
  price: z.number().optional(),
  categoryId: z.string().optional(),
  thumbnailUrl: z.string().nullable().optional(),
})

export const instructorInfoSchema = z.object({
  name: z.string(),
  title: z.string(),
  avatar: z.string(),
})

export const courseResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['pdf', 'doc', 'text']),
  icon: z.string(),
  iconColor: z.string(),
})

export const resourceSectionSchema = z.object({
  title: z.string(),
  resources: courseResourceSchema.array(),
})

export const lessonItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string(),
  type: z.enum(['video', 'assignment']),
  dueDate: z.string().optional(),
})

export const syllabusModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  isExpanded: z.boolean().optional(),
  lessons: lessonItemSchema.array(),
})

export const activityItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  action: z.string(),
  timestamp: z.string(),
  avatar: z.string().optional(),
  initials: z.string().optional(),
  avatarBg: z.string().optional(),
  avatarColor: z.string().optional(),
})

export const dashboardCourseDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  code: z.string(),
  semester: z.string(),
  credits: z.number(),
  category: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  price: z.number().optional(),
  categoryId: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
  instructor: instructorInfoSchema,
  stats: z.object({
    enrolledStudents: z.number(),
    avgCompletion: z.number(),
  }),
  modules: syllabusModuleSchema.array(),
  resources: resourceSectionSchema.array(),
  activities: activityItemSchema.array(),
})

export const teacherCourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  code: z.string(),
  icon: z.string(),
  iconBg: z.string(),
  iconColor: z.string(),
  description: z.string().nullable().optional(),
  price: z.number().optional(),
  categoryId: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  students: z.number(),
  lastUpdated: z.string(),
})

export const approvalItemSchema = z.object({
  id: z.string(),
  courseTitle: z.string(),
  instructorName: z.string(),
  instructorInitials: z.string(),
  category: z.string(),
  submittedAgo: z.string(),
})

export const continueLearningSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  thumbnail: z.string(),
  currentModule: z.number(),
  totalModules: z.number(),
  progress: z.number(),
})

export const studentCourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  instructor: z.string(),
  icon: z.string(),
  iconBg: z.string(),
  iconColor: z.string(),
  progress: z.number(),
})

export const recommendedCourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  thumbnail: z.string(),
  tags: z.string().array().optional(),
  rating: z.number().optional(),
  reviews: z.string().optional(),
  level: z.string().optional(),
  type: z.enum(['large', 'small']),
})

// ─── UI / Dashboard Inferred Types ────────────────────────────────────────────

export type CourseInstructor = z.infer<typeof courseInstructorSchema>
export type CourseListItem = z.infer<typeof courseListItemSchema>
export type CategoryOption = z.infer<typeof categoryOptionSchema>
export type CourseDetailLesson = z.infer<typeof courseDetailLessonSchema>
export type CourseDetailUIReady = z.infer<typeof courseDetailUIReadySchema>
export type DashboardCourse = z.infer<typeof dashboardCourseSchema>
export type InstructorInfo = z.infer<typeof instructorInfoSchema>
export type CourseResource = z.infer<typeof courseResourceSchema>
export type ResourceSection = z.infer<typeof resourceSectionSchema>
export type LessonItem = z.infer<typeof lessonItemSchema>
export type SyllabusModule = z.infer<typeof syllabusModuleSchema>
export type ActivityItem = z.infer<typeof activityItemSchema>
export type DashboardCourseDetail = z.infer<typeof dashboardCourseDetailSchema>
export type TeacherCourse = z.infer<typeof teacherCourseSchema>
export type ApprovalItem = z.infer<typeof approvalItemSchema>
export type ContinueLearning = z.infer<typeof continueLearningSchema>
export type StudentCourse = z.infer<typeof studentCourseSchema>
export type RecommendedCourse = z.infer<typeof recommendedCourseSchema>
