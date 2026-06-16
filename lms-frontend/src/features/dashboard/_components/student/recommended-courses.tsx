import { Card, CardContent, CardHeader } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { RecommendedCoursesSkeleton } from '#/components/loading-skeleton'
import { EmptyState } from '#/components/empty-state'

import type { RecommendedCourse } from '../../_types/student.types'

interface RecommendedCoursesProps {
  courses?: RecommendedCourse[]
  isLoading: boolean
}

function LargeCard({ course }: { course: RecommendedCourse }) {
  return (
    <Card className="p-0 gap-0 overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-28 sm:h-32 bg-muted relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 flex flex-col gap-2">
        {course.tags && (
          <div className="flex flex-wrap gap-1.5">
            {course.tags.map((tag) => (
              <Badge key={tag} variant="default" className="text-[10px] uppercase tracking-wider">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <h4 className="text-sm font-bold text-foreground">{course.title}</h4>
        {course.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
            {course.description}
          </p>
        )}
        <Button variant="outline" className="w-full mt-1">
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}

function SmallCard({ course }: { course: RecommendedCourse }) {
  return (
    <Card className="p-0 gap-0 hover:bg-accent/50 transition-colors cursor-pointer">
      <CardContent className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="size-14 sm:size-16 rounded-lg object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-foreground mb-1 truncate">
            {course.title}
          </h4>
          {course.rating && (
            <p className="text-xs text-muted-foreground mb-1.5">
              {course.rating} ★ ({course.reviews})
            </p>
          )}
          {course.level && (
            <Badge variant="secondary" className="text-xs">
              {course.level}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function RecommendedCourses({
  courses,
  isLoading,
}: RecommendedCoursesProps) {
  if (isLoading) {
    return <RecommendedCoursesSkeleton />
  }

  if (!courses) return null

  if (courses.length === 0) {
    return (
      <EmptyState
        title="No recommendations yet"
        message="Complete more courses to get personalized recommendations."
      />
    )
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
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
