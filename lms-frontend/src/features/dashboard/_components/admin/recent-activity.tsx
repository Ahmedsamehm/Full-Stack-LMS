import { GraduationCap, UserPlus, CreditCard, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { ListSkeleton } from '#/components/loading-skeleton'

import type { ActivityItem } from '../../_types/admin.types'

interface RecentActivityProps {
  activities?: ActivityItem[]
  isLoading: boolean
}

const iconMap: Partial<Record<string, React.ComponentType<{ className?: string }>>> = {
  school: GraduationCap,
  person_add: UserPlus,
  payments: CreditCard,
  report: AlertTriangle,
}

function ActivityRow({ item }: { item: ActivityItem }) {
  const Icon = iconMap[item.icon] ?? GraduationCap

  return (
    <div className="flex gap-3 sm:gap-4 relative">
      {!item.isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-px bg-border/50" />
      )}
      <div
        className={`size-6 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 z-10 border-2 border-card`}
      >
        <Icon className="size-3.5" />
      </div>
      <div className="flex flex-col min-w-0">
        <p className="text-sm text-foreground">
          {item.textParts.map((part, i) =>
            part.bold ? (
              <span key={i} className="font-medium">{part.text}</span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
        <span className="text-xs text-muted-foreground mt-0.5">{item.time}</span>
      </div>
    </div>
  )
}

export default function RecentActivity({ activities, isLoading }: RecentActivityProps) {
  if (isLoading) {
    return <ListSkeleton count={4} hasHeader={true} className="col-span-1" />
  }

  if (!activities) return null

  return (
    <Card className="col-span-1 flex flex-col h-full p-0 gap-0">
      <CardHeader className="p-4 sm:p-6 pb-0">
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 flex-1 flex flex-col gap-5 sm:gap-6 overflow-y-auto">
        {activities.map((item) => (
          <ActivityRow key={item.id} item={item} />
        ))}
      </CardContent>

      <CardFooter className="p-3 sm:p-4">
        <Button variant="ghost" className="w-full text-xs font-medium text-muted-foreground hover:text-primary">
          Load More
        </Button>
      </CardFooter>
    </Card>
  )
}
