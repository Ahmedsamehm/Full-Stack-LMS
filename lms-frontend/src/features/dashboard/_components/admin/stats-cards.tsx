import { Users, Award, CreditCard, Clock, TrendingUp, Minus, AlertTriangle } from 'lucide-react'
import { StatsCardsSkeleton } from '#/components/loading-skeleton'
import { StatCard } from '../shared/stat-card'

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
    accentBg: 'bg-primary/5',
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
    accentBg: 'bg-secondary/5',
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
    accentBg: 'bg-tertiary/5',
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
    accentBg: 'bg-error/5',
    key: 'approvalQueue' as const,
    changeKey: 'approvalQueue' as const,
    trendIcon: AlertTriangle,
    trendColor: 'text-error',
  },
]

export default function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading) {
    return <StatsCardsSkeleton count={4} />
  }

  if (!stats) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <StatCard
          key={card.label}
          label={card.label}
          value={formatValue(card.key, stats[card.key])}
          icon={card.icon}
          iconBg={card.iconBg}
          iconColor={card.iconColor}
          trendIcon={card.trendIcon}
          trendText={getChangeText(stats, card.changeKey)}
          trendColor={card.trendColor}
          className="hover:shadow-md transition-shadow"
        >
          <div className={`absolute -right-4 -top-4 size-24 ${card.accentBg} rounded-full blur-xl`} />
        </StatCard>
      ))}
    </div>
  )
}
