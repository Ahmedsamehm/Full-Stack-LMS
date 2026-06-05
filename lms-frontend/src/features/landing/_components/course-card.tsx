import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import CategoryBadge from './category-badge'
import CourseInstructor from './course-instructor'
import CourseThumbnail from './course-thumbnail'
import PriceTag from './price-tag'

import type { LandingCourse } from '../_types/landing.types'

interface CourseCardProps {
  course: LandingCourse
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="group gap-0 overflow-hidden hover:shadow-md transition-all duration-300">
      <CourseThumbnail category={course.category} />
      <CardContent className="p-5 space-y-4">
        <CategoryBadge category={course.category} />

        <div className="space-y-1.5">
          <h3 className="text-lg font-semibold text-foreground leading-snug">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        <CourseInstructor {...course.instructor} />

        <div className="flex items-center justify-between pt-2">
          <PriceTag price={course.price} originalPrice={course.originalPrice} />
          <Button
            size="sm"
            className="text-white bg-primary hover:bg-primary/90"
          >
            Enroll Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
