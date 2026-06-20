import { Loader2 } from 'lucide-react'
import { Button } from '#/components/ui/button'
import CourseStats from './course-stats'
import { handleCourseEnrollment } from '#/features/payments/_services/checkout.service'
import type { UseMutationResult } from '@tanstack/react-query'

interface CourseSidebarCardProps {
  courseId: string
  price: number
  originalPrice?: number
  totalLessons: number
  totalDuration: number
  enrollments: number
  checkout: UseMutationResult<{ checkoutUrl: string; sessionId: string }, Error, string>
  enrollFree: UseMutationResult<unknown, Error, string>
}

export default function CourseSidebarCard({
  courseId,
  price,
  totalLessons,
  totalDuration,
  enrollments,
  checkout,
  enrollFree,
}: CourseSidebarCardProps) {
  const isPending = checkout.isPending || enrollFree.isPending

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-foreground">${price}</span>
        </div>

        <div className="space-y-3">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-white"
            size="lg"
            disabled={isPending}
            onClick={() => handleCourseEnrollment(courseId, price, { checkout, enrollFree })}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Buy Now'
            )}
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
