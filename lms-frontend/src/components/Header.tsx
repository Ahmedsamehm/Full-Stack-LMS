import { Link } from '@tanstack/react-router'

import { Button } from '#/components/ui/button'
import BrandLogo from '../features/landing/_components/brand-logo'
import { useGetUser } from '#/features/users/_hooks/useGetUser'
import { useLogout } from '#/features/auth/_hooks/useLogout'
import { Skeleton } from './ui/skeleton'

export default function Header() {
  const { data: user, isPending } = useGetUser()
  const { mutateAsync } = useLogout()

  const handleLogOut = () => {
    mutateAsync()
  }
  
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
          {user && (
            <Link
              to="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground no-underline! transition-colors"
            >
              Dashboard
            </Link>
          )}

        </div>

        <div className="flex items-center gap-2 ">
          {isPending ? (
            <Skeleton className="h-5 w-24  text-muted-foreground" />
          ) : user ? (
            <>
             <Button onClick={handleLogOut} size="sm" variant="outline" asChild>
     
              <Link to="/login" className="no-underline! text-primary">
                Log Out
              </Link>
           
            </Button>
          
            </>
          ) : (
              <>
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
              </>
          )}
     
        </div>
          
      </nav>
    </header>
  )
}
