import { Link } from '@tanstack/react-router'

import { Button } from '#/components/ui/button'
import BrandLogo from '../features/landing/_components/brand-logo'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 px-4 sm:px-6 lg:px-8 backdrop-blur-lg">
      <nav className="flex items-center justify-between gap-4 h-16 max-w-[1440px] mx-auto">
        <BrandLogo />

        <div className="hidden sm:flex items-center gap-6">
          <Link
            to="/courses"
            className="text-sm font-medium text-muted-foreground hover:text-foreground no-underline! transition-colors"
          >
            Courses
          </Link>
          <Link
            to="/dashboards/student"
            className="text-sm font-medium text-muted-foreground hover:text-foreground no-underline! transition-colors"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-2 ">
          <Button size="sm" className="hidden sm:inline-flex " asChild>
            <Link to="/login" className="no-underline! text-white! ">
              Sign In
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="hidden sm:inline-flex"
            asChild
          >
            <Link to="/register" className="no-underline!">
              Get Started
            </Link>
          </Button>

          <Button size="sm" className="sm:hidden" asChild>
            <Link to="/login" className="no-underline! text-white! ">
              Sign In
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
