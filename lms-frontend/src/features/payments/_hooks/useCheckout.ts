import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCheckoutSession, enrollFreeCourse } from '../_api/checkout'

// ─── useCreateCheckoutSession ──────────────────────────────────────────────────

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: async (courseId: string) => {
      const { data } = await createCheckoutSession({ data: { courseId } })

      return data as { checkoutUrl: string; sessionId: string }
    },
  })
}

// ─── useEnrollFreeCourse ───────────────────────────────────────────────────────

export function useEnrollFreeCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (courseId: string) => {
      const { data } = await enrollFreeCourse({ data: courseId })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })
}
