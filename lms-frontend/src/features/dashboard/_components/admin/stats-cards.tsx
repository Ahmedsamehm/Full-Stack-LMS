import { Users, Award, CreditCard, Clock, TrendingUp, Minus, AlertTriangle } from 'lucide-react'
import { Skeleton } from '#/components/ui/skeleton'

import type { AdminStats } from '../../_types/admin.types'

interface StatsCardsProps {
  stats?: AdminStats
  isLoading: boolean
}

function formatValue(key: string, value: number): string {
  if (key === 'monthlyRevenue') return `$${(value / 1000).toFixed(1)}k`
  return value.toLocaleString()
}

function getChangeText(stats: AdminStats, changeKey: string): string {
  if (changeKey === 'approvalQueue') return 'Requires attention'
  if (changeKey === 'activeUsersChange') return stats.activeUsersChange
  if (changeKey === 'teachersTrend') return stats.teachersTrend
  if (changeKey === 'revenueChange') return stats.revenueChange
  return ''
}

const cards = [
  {
    label: 'Active Users',
    icon: Users,
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    bgAccent: 'bg-primary/5',
    key: 'activeUsers' as const,
    changeKey: 'activeUsersChange' as const,
    trendIcon: TrendingUp,
    trendColor: 'text-primary',
  },
  {
    label: 'Total Teachers',
    icon: Award,
    iconBg: 'bg-secondary-fixed',
    iconColor: 'text-secondary',
    bgAccent: 'bg-secondary/5',
    key: 'totalTeachers' as const,
    changeKey: 'teachersTrend' as const,
    trendIcon: Minus,
    trendColor: 'text-secondary',
  },
  {
    label: 'Monthly Revenue',
    icon: CreditCard,
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-tertiary',
    bgAccent: 'bg-tertiary/5',
    key: 'monthlyRevenue' as const,
    changeKey: 'revenueChange' as const,
    trendIcon: TrendingUp,
    trendColor: 'text-tertiary',
  },
  {
    label: 'Approval Queue',
    icon: Clock,
    iconBg: 'bg-error-container',
    iconColor: 'text-error',
    bgAccent: 'bg-error/5',
    key: 'approvalQueue' as const,
    changeKey: 'approvalQueue' as const,
    trendIcon: AlertTriangle,
    trendColor: 'text-error',
  },
]

export default function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon
        const TrendIcon = card.trendIcon
        const value = stats[card.key]
        const changeText = getChangeText(stats, card.changeKey)

        return (
          <div
            key={card.label}
            className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className={`absolute -right-4 -top-4 size-24 ${card.bgAccent} rounded-full blur-xl`} />
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-on-surface-variant">{card.label}</span>
              <div className={`${card.iconBg} ${card.iconColor} p-1.5 rounded-lg`}>
                <Icon className="size-5" />
              </div>
            </div>
            <span className="text-4xl font-bold text-on-surface tracking-tight">
              {formatValue(card.key, value)}
            </span>
            <div className={`flex items-center gap-1 ${card.trendColor}`}>
              <TrendIcon className="size-4" />
              <span className="text-xs font-semibold">{changeText}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
