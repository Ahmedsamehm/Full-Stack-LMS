import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  viewAll?: boolean
  viewAllLink?: string
}

export default function SectionHeader({
  title,
  viewAll = true,
  viewAllLink = '/',
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8 sm:mb-10">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {viewAll && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary shrink-0 cursor-default no-underline! transition-colors hover:text-primary/80 cursor-pointer"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
