import { Button } from '#/components/ui/button'

import CourseStats from './course-stats'
interface CourseSidebarCardProps {
  price: number
  originalPrice?: number
  totalLessons: number
  totalDuration: number
  enrollments: number
}

export default function CourseSidebarCard({
  price,
  totalLessons,
  totalDuration,
  enrollments,
}: CourseSidebarCardProps) {
  
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-foreground">${price}</span>
          {/* {hasDiscount && (
            <>
              <span className="text-lg text-muted-foreground line-through">${originalPrice}</span>
              <Badge variant="destructive">{discountPercent}% off</Badge>
            </>
          )} */}
        </div>

        <div className="space-y-3">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
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
