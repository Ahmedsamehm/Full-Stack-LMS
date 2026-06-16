import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

interface StatCardProps {
  label: string
  value: ReactNode
  icon: LucideIcon
  iconBg?: string
  iconColor?: string
  trendIcon?: LucideIcon
  trendText?: ReactNode
  trendColor?: string
  className?: string
  children?: ReactNode
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconBg = 'bg-primary/10',
  iconColor = 'text-primary',
  trendIcon: TrendIcon,
  trendText,
  trendColor = 'text-primary',
  className = '',
  children,
}: StatCardProps) {
  return (
    <Card className={`relative overflow-hidden p-0 gap-0 ${className}`}>
      {children}
      <CardContent className="flex flex-col gap-3 p-4 sm:p-6">
        <div className="flex justify-between items-start gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
          <div className={`${iconBg} ${iconColor} p-1.5 rounded-lg shrink-0`}>
            <Icon className="size-4 sm:size-5" />
          </div>
        </div>
        <span className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
          {value}
        </span>
        {trendText && TrendIcon && (
          <Badge variant="outline" className={`w-fit gap-1 ${trendColor}`}>
            <TrendIcon className="size-3" />
            {typeof trendText === 'string' ? (
              <span className="text-xs font-semibold">{trendText}</span>
            ) : (
              trendText
            )}
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
