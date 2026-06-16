import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CardSkeleton } from '#/components/loading-skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'

import type { MonthlyRevenue } from '../_types/payment.types'

interface PaymentsOverviewProps {
  data?: MonthlyRevenue[]
  isLoading: boolean
}

export default function PaymentsOverview({ data, isLoading }: PaymentsOverviewProps) {
  if (isLoading) {
    return <CardSkeleton />
  }

  if (!data) return null

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-semibold text-on-surface">Payments Overview</h2>
        <Select defaultValue="30">
          <SelectTrigger className="w-40 bg-surface-container border-outline-variant h-9 text-xs">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">Last 30 Days</SelectItem>
            <SelectItem value="90">This Quarter</SelectItem>
            <SelectItem value="365">Year to Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '13px',
              }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
            />
            <Bar
              dataKey="revenue"
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
