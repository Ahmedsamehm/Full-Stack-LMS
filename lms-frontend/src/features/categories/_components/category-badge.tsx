import { Badge } from '#/components/ui/badge'

interface CategoryBadgeProps {
  category: string
}

const variantMap: Record<string, 'development' | 'design' | 'data-science'> = {
  Development: 'development',
  Design: 'design',
  'Data Science': 'data-science',
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const variant = variantMap[category] ?? 'default'

  return <Badge variant={variant}>{category}</Badge>
}
