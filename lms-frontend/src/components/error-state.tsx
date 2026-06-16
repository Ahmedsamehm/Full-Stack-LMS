import { AlertCircle } from 'lucide-react'
import { Button } from '#/components/ui/button'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto">
      <div className="rounded-full bg-destructive/10 p-4 mb-5 text-destructive animate-pulse">
        <AlertCircle className="w-12 h-12" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-base text-muted-foreground mb-8 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="default" className="text-white hover:bg-primary/95 min-w-[120px]">
          Try Again
        </Button>
      )}
    </div>
  )
}
