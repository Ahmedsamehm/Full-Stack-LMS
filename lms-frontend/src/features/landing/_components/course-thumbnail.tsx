import { Code, Palette, BarChart3 } from 'lucide-react'

interface CourseThumbnailProps {
  category: string
}

const configMap: Record<string, { icon: React.ComponentType<{ className?: string }>; gradient: string }> = {
  Development: {
    icon: Code,
    gradient: 'from-blue-500/20 to-blue-600/10',
  },
  Design: {
    icon: Palette,
    gradient: 'from-purple-500/20 to-purple-600/10',
  },
  'Data Science': {
    icon: BarChart3,
    gradient: 'from-amber-500/20 to-amber-600/10',
  },
}

export default function CourseThumbnail({ category }: CourseThumbnailProps) {
  const config = configMap[category] ?? configMap['Development']
  const Icon = config.icon

  return (
    <div className={`h-44 bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
      <Icon className="h-12 w-12 text-foreground/20" />
    </div>
  )
}
