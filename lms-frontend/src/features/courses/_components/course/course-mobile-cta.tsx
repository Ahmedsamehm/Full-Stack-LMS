import { Loader2 } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { handleCourseEnrollment } from '#/features/payments/_services/checkout.service'
import type { UseMutationResult } from '@tanstack/react-query'

interface CourseMobileCtaProps {
  courseId: string
  price: number
  checkout: UseMutationResult<{ checkoutUrl: string; sessionId: string }, Error, string>
  enrollFree: UseMutationResult<unknown, Error, string>
}

export default function CourseMobileCta({ courseId, price, checkout, enrollFree }: CourseMobileCtaProps) {
  const isPending = checkout.isPending || enrollFree.isPending

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        <span className="text-xl font-bold text-foreground">${price}</span>
        <Button
          className="bg-primary hover:bg-primary/90 text-white"
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
  )
}
