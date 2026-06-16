import { toast } from 'sonner'
import type { UseMutationResult } from '@tanstack/react-query'

// ─── Types ─────────────────────────────────────────────────────────────────────

interface CheckoutMutations {
  checkout: UseMutationResult<{ checkoutUrl: string; sessionId: string }, Error, string>
  enrollFree: UseMutationResult<unknown, Error, string>
}

// ─── handleCourseEnrollment ────────────────────────────────────────────────────

/**
 * Handles the business logic for buying or enrolling in a course.
 * - Free courses  → call `enrollFree` mutation with a toast.
 * - Paid courses  → call `checkout` mutation, then redirect to Stripe.
 */
export function handleCourseEnrollment(
  courseId: string,
  price: number,
  { checkout, enrollFree }: CheckoutMutations,
): void {
  if (price <= 0) {
    toast.promise(enrollFree.mutateAsync(courseId), {
      loading: 'Enrolling you in the course...',
      success: 'Enrolled successfully! Enjoy learning.',
      error: 'Failed to enroll. Please try again.',
    })
    return
  }

  const promise = checkout.mutateAsync(courseId).then((data) => {
    if (data?.checkoutUrl) {
      window.location.href = data.checkoutUrl
    } else {
      throw new Error('Checkout URL not found')
    }
  })

  toast.promise(promise, {
    loading: 'Creating checkout session...',
    success: 'Redirecting to Stripe payment gateway...',
    error: 'Could not create checkout session. Please try again.',
  })
}
