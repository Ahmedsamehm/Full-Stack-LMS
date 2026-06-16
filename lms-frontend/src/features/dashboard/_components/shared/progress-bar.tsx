import { Progress } from '#/components/ui/progress'

interface ProgressBarProps {
  value: number
  className?: string
  barColor?: string
  size?: 'sm' | 'md'
}

export function ProgressBar({ value, className = '', barColor = 'bg-primary', size = 'md' }: ProgressBarProps) {
  const height = size === 'sm' ? 'h-1.5' : 'h-2'
  return (
    <Progress
      value={value}
      className={`w-full ${height} ${className}`}
      indicatorClassName={barColor}
    />
  )
}
