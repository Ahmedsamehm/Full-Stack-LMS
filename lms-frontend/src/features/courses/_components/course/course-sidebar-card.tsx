import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'

import CourseStats from './course-stats'
import type { CourseSidebarCardProps } from '../../_types/courses.types'

export default function CourseSidebarCard({
  price,
  originalPrice,
  totalLessons,
  totalDuration,
  enrollments,
}: CourseSidebarCardProps) {
  const hasDiscount = originalPrice && originalPrice > price
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-foreground">${price}</span>
          {hasDiscount && (
            <>
              <span className="text-lg text-muted-foreground line-through">${originalPrice}</span>
              <Badge variant="destructive">{discountPercent}% off</Badge>
            </>
          )}
        </div>

        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
            Buy Now
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            Add to Cart
          </Button>
        </div>
      </div>

      <CourseStats
        totalLessons={totalLessons}
        totalDuration={totalDuration}
        enrollments={enrollments}
      />
    </div>
  )
}
