import type {
  CourseDetail as ApiCourseDetail,
  CourseDetailUIReady as UiCourseDetail,
  CourseListItem,
  DashboardCourse,
  DashboardCourseDetail,
} from '#/schemas'
import type { ApiCourse } from '#/features/teacher/_services/course-transformer'

export type { ApiCourse }

const FALLBACK_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBP9a5W7KRyEAv6Un4SdLucgNWuu8pWZKm8fgczFWUk-6a0Kn4J3BEwRZUyr4lSF-x-e2VvyRerBZGl4uBZ6AL3M4jjYuPl7ab3wMasQ8Oq4sj61GwnwMAKazsi3RWLXL7avHoFPEokIey7qH_B4n8vn5BeFF5pVGa4nxg_Zler8aMEn29eDk9d0ixr0L1GYQC8tiYuGXAgTtY2gtRpII_NZCV_RrT30w0O5T9MkGKaXEythGeatRN7O3xIMqz9iXpozo1PxUg6TNbb'

const FALLBACK_THUMBNAIL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB7lma5u7n3BUe6rW4tPxvm5vNpPHvlXlCtH8ui4B6k3VfjmPe3OudbYrTppfbLjXaBrQXcEqXpVLWXIyXtFeVn_ItKvaOfH-Bw-IKMXaVvIUFp3Kv5CNSmQcLszIeP0cY2vseOMxrdB1hhL6a4my7ejKtX3wAWaUd47veJ0dStNoZhlXiPLXD5Yafew8yXIQ0ZmP1qkGSbD_xtGrqWHQ-A82pT4E7YyhPGs7pn5l1kd4hAuWG3X6dMTPesyUNE1OEoAHfVX3PXWwjJ'

export interface ApiEnrollment {
  id: string
  progress: number
  status: 'PENDING' | 'ACTIVE' | 'REJECTED' | 'EXPIRED'
  course: ApiCourse
}

/**
 * Transforms the course detail response from the API into the structure expected by the UI.
 *
 * @param courseData The API course detail data
 */
export function transformCourseDetail(courseData: ApiCourseDetail): UiCourseDetail {
  const teacherName = courseData.teacher?.name || "Instructor"
  const teacherInitials = courseData.teacher?.name
    ? courseData.teacher.name.split(" ").map((n) => n[0]).join("")
    : "IN"

  return {
    id: courseData.id,
    slug: courseData.id,
    title: courseData.title,
    description: courseData.description || "",
    price: courseData.price,
    originalPrice: undefined,
    thumbnailUrl: courseData.thumbnailUrl || undefined,
    category: courseData.category?.name || "Uncategorized",
    stats: {
      enrollments: courseData.stats?.enrollments ?? 0,
    },
    instructor: {
      id: courseData.teacher?.id || "",
      name: teacherName,
      initials: teacherInitials,
      rating: 4.8,
      reviewCount: 120,
    },
    lessons: (courseData.lessons || []).map((l) => ({
      id: l.id,
      title: l.title,
      duration: l.duration,
      orderIndex: l.orderIndex,
      description: "",
    })),
    totalLessons: courseData.lessons?.length || 0,
    totalDuration: courseData.lessons?.reduce((acc, l) => acc + (l.duration || 0), 0) || 0,
    objectives: [
      "Master the core concepts of this course",
      "Gain practical, hands-on experience",
      "Learn best practices from industry experts",
    ],
    teacherBio: "Experienced professional instructor dedicated to teaching high-quality technical skills.",
    teacherInitials,
  }
}

export function transformDashboardCourse(course: ApiCourse): DashboardCourse {
  return {
    id: course.id,
    title: course.title,
    category: course.category?.name || 'Uncategorized',
    instructorName: course.teacher?.name || 'Instructor',
    instructorAvatar: course.teacher?.avatarUrl || FALLBACK_AVATAR,
    thumbnail: course.thumbnailUrl || FALLBACK_THUMBNAIL,
    enrolledCount: course.stats?.enrollments || 0,
    status: course.status,
    description: course.description || null,
    price: course.price,
    categoryId: course.categoryId || course.category?.id,
    thumbnailUrl: course.thumbnailUrl || null,
  }
}

export function transformDashboardEnrollment(enrollment: ApiEnrollment): DashboardCourse {
  const course = enrollment.course
  return {
    id: course.id,
    title: course.title,
    category: course.category?.name || 'Uncategorized',
    instructorName: course.teacher?.name || 'Instructor',
    instructorAvatar: course.teacher?.avatarUrl || FALLBACK_AVATAR,
    thumbnail: course.thumbnailUrl || FALLBACK_THUMBNAIL,
    enrolledCount: 0,
    status: course.status || 'PUBLISHED',
    progress: enrollment.progress,
    enrollmentStatus: enrollment.status,
    enrollmentId: enrollment.id,
  }
}

export function transformDashboardCourseDetail(course: ApiCourseDetail): DashboardCourseDetail {
  const lessons = course.lessons ?? []
  return {
    id: course.id,
    title: course.title,
    code: 'CRS-101',
    semester: 'Fall 2026',
    credits: 3,
    category: course.category?.name || 'Uncategorized',
    description: course.description || 'No description provided.',
    thumbnail: course.thumbnailUrl || FALLBACK_THUMBNAIL,
    price: course.price,
    categoryId: course.category?.id,
    thumbnailUrl: course.thumbnailUrl || undefined,
    status: course.status || undefined,
    instructor: {
      name: course.teacher?.name || 'Instructor',
      title: 'Lead Instructor',
      avatar: course.teacher?.avatarUrl || FALLBACK_AVATAR,
    },
    stats: {
      enrolledStudents: course.stats?.enrollments || 0,
      avgCompletion: 85,
    },
    modules: [
      {
        id: 'm1',
        title: 'Course Content',
        subtitle: `${lessons.length} lessons`,
        isExpanded: true,
        lessons: lessons.map((l) => ({
          id: l.id,
          title: l.title,
          duration: `${Math.round((l.duration || 0) / 60)} min`,
          type: 'video' as const,
        })),
      },
    ],
    resources: [
      {
        title: 'Syllabus & Guidelines',
        resources: [
          {
            id: 'res-1',
            name: 'Course Syllabus.pdf',
            type: 'pdf' as const,
            icon: 'picture_as_pdf',
            iconColor: 'text-error',
          },
        ],
      },
    ],
    activities: [
      {
        id: 'act-1',
        name: 'System',
        action: 'Course details successfully synchronized from database.',
        timestamp: 'Just now',
        initials: 'SYS',
        avatarBg: 'bg-primary-container',
        avatarColor: 'text-on-primary-container',
      },
    ],
  }
}

/**
 * Transforms a course list item from the API/backend into the structure expected by the UI.
 *
 * @param course The API course data
 */
export function transformCourseListItem(course: ApiCourse): CourseListItem {
  const teacherName = course.teacher?.name || "Instructor"
  const teacherInitials = course.teacher?.name
    ? course.teacher.name.split(" ").map((n: string) => n[0]).join("")
    : "IN"

  return {
    id: course.id,
    slug: course.slug || course.id,
    category: course.category?.name || "Uncategorized",
    title: course.title,
    description: course.description || "",
    price: course.price || 0,
    originalPrice: course.originalPrice,
    instructor: {
      id: course.teacher?.id || course.teacherId || "",
      name: teacherName,
      initials: teacherInitials,
      rating: 4.8,
      reviewCount: 120,
    },
  }
}


