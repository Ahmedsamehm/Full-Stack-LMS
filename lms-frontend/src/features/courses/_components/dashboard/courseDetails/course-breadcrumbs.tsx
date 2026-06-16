import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

interface CourseBreadcrumbsProps {
  category: string
  title: string
}

export function CourseBreadcrumbs({ category, title }: CourseBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex text-sm text-secondary mb-2">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link to="/dashboard/courses" className="hover:text-primary transition-colors text-sm">
            Courses
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="size-4 mx-1 text-secondary" />
            <a href="#" className="hover:text-primary transition-colors text-sm">
              {category}
            </a>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="size-4 mx-1 text-secondary" />
            <span className="text-sm text-on-surface">{title}</span>
          </div>
        </li>
      </ol>
    </nav>
  )
}
