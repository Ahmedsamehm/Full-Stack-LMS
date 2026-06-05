import { Link } from '@tanstack/react-router'
import { Bell, HelpCircle, Search, User } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import BrandLogo from './brand-logo'
import SearchBar from './search-bar'

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 px-4 sm:px-6 lg:px-8 backdrop-blur-lg">
      <nav className="flex items-center justify-between gap-4 h-16 max-w-[1440px] mx-auto">
        <BrandLogo />

        <div className="hidden md:block flex-1 max-w-2xl mx-auto">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Search"
          >
            <Search className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="Help"
          >
            <HelpCircle className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label="Account"
            asChild
          >
            <Link to="/login" className="no-underline">
              <User className="size-5" />
            </Link>
          </Button>

          <Link to="/login" aria-label="Sign in" className="hidden sm:block">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                U
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </nav>
    </header>
  )
}
