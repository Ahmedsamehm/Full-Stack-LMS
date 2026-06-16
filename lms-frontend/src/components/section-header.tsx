import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  description?: string
  viewAll?: boolean
  viewAllLink?: string
  action?: ReactNode
}

export default function SectionHeader({
  title,
  description,
  viewAll = true,
  viewAllLink = '/',
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8 sm:mb-10">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-base text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {action}
        {viewAll && (
          <Link
            to={viewAllLink}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary no-underline! transition-colors hover:text-primary/80 cursor-pointer"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
