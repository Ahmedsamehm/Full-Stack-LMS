import { Skeleton } from '#/components/ui/skeleton'

import type { RecommendedCourse } from '../../_types/student.types'

interface RecommendedCoursesProps {
  courses?: RecommendedCourse[]
  isLoading: boolean
}

function LargeCard({ course }: { course: RecommendedCourse }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col">
      <div className="h-32 bg-surface-container-low relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        {course.tags && (
          <div className="flex gap-2">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary  text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h4 className="text-sm font-bold text-on-surface">{course.title}</h4>
        {course.description && (
          <p className="text-xs text-on-surface-variant line-clamp-2 mb-2">
            {course.description}
          </p>
        )}
        <button className="w-full bg-surface-container-low hover:bg-surface-container-high text-on-surface rounded-lg text-sm font-medium py-2 transition-colors border border-outline-variant">
          View Details
        </button>
      </div>
    </div>
  )
}

function SmallCard({ course }: { course: RecommendedCourse }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 flex items-start gap-4 hover:bg-surface-container-lowest/80 transition-colors cursor-pointer">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="size-16 rounded-lg object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-on-surface mb-1">
          {course.title}
        </h4>
        {course.rating && (
          <p className="text-xs text-on-surface-variant mb-2">
            {course.rating} ★ ({course.reviews})
          </p>
        )}
        {course.level && (
          <span className="text-xs font-medium text-primary">
            {course.level}
          </span>
        )}
      </div>
    </div>
  )
}

export default function RecommendedCourses({
  courses,
  isLoading,
}: RecommendedCoursesProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
          <Skeleton className="h-32 w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 flex gap-4">
          <Skeleton className="size-16 rounded-lg shrink-0" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!courses) return null

  return (
    <div className="flex flex-col gap-4">
      {courses.map((course) =>
        course.type === 'large' ? (
          <LargeCard key={course.id} course={course} />
        ) : (
          <SmallCard key={course.id} course={course} />
        ),
      )}
    </div>
  )
}
