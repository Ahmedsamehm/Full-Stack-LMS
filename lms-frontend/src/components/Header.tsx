import { Link } from '@tanstack/react-router'
import { Bell, HelpCircle, Search, User } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary ">
          EduPro SaaS
        </Link>

        {/* Search - Hidden on small mobile */}
        <div className="hidden md:block relative w-full max-w-2xl mx-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search courses, teachers..." 
            className="pl-9 bg-muted/50 border-none focus-visible:ring-1"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Help">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full overflow-hidden p-0 border">
             <div className="h-8 w-8 bg-gray-200 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-500" />
             </div>
          </Button>
        </div>
      </div>
    </header>
  )
}
