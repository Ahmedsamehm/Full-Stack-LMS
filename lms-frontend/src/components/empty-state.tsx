import { Inbox } from 'lucide-react'
import { cn } from '#/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title?: string
  message?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon = <Inbox className="w-12 h-12" />,
  title = 'No data found',
  message = 'There are no items to display at the moment.',
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center max-w-3xl mx-auto', className)}>
      <div className="rounded-full bg-muted p-4 mb-5 text-muted-foreground">{icon}</div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{message}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
