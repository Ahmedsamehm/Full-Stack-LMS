import { useEffect, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CheckCircle, XCircle, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'
import { Card, CardContent } from '#/components/ui/card'
import { Button } from '#/components/ui/button'

const paymentResultSearchSchema = z.object({
  status: z.enum(['success', 'failed']),
  courseId: z.string().optional(),
})

export const Route = createFileRoute('/_protected/dashboard/payment-result/')({
  validateSearch: (search) => paymentResultSearchSchema.parse(search),
  component: RouteComponent,
})

function RouteComponent() {
  const { status, courseId } = Route.useSearch()
  const navigate = useNavigate()
  const isSuccess = status === 'success'
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (isSuccess) {
      toast.success('Payment successful! You now have access to the course.')
    } else {
      toast.error("Payment was cancelled or failed. You haven't been charged.")
    }
  }, [isSuccess])

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  useEffect(() => {
    if (countdown <= 0) {
      if (isSuccess && courseId) {
        navigate({ to: '/dashboard/courses/$id', params: { id: courseId } })
      } else {
        navigate({ to: '/dashboard/buy-courses' })
      }
    }
  }, [countdown, isSuccess, courseId, navigate])

  const handleAction = () => {
    if (isSuccess && courseId) {
      navigate({ to: '/dashboard/courses/$id', params: { id: courseId } })
    } else {
      navigate({ to: '/dashboard/buy-courses' })
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl text-center">
        <CardContent className="pt-10 pb-8 px-8 flex flex-col items-center gap-5">
          <div className={`flex items-center justify-center size-16 rounded-full ${isSuccess ? 'bg-green-500/10' : 'bg-destructive/10'}`}>
            {isSuccess ? <CheckCircle className="size-8 text-green-600" /> : <XCircle className="size-8 text-destructive" />}
          </div>

          <div className="space-y-2">
            <h1 className={`text-2xl font-bold ${isSuccess ? 'text-green-600' : 'text-destructive'}`}>
              {isSuccess ? 'Payment Successful' : 'Payment Failed'}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isSuccess
                ? 'Your enrollment is confirmed. You now have access to the course.'
                : "Your payment was cancelled or failed. You haven't been charged."}
            </p>
          </div>

          <Button onClick={handleAction} className="w-full gap-2 text-white" >
            {isSuccess ? 'Go to Course' : 'Browse Courses'}
            <ArrowRight className="size-4" />
          </Button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-3 animate-spin" />
            <span>Redirecting in {countdown}s...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
