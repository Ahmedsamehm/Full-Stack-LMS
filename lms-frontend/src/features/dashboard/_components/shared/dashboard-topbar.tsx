import { ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import NotificationDropdown from '#/features/notifications/_components/notification-dropdown'
import { useGetUser } from '#/features/users/_hooks/useGetUser'
import { Skeleton } from '#/components/ui/skeleton'
import SearchBar from '#/components/search-bar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'
import { useLogout } from '#/features/auth/_hooks/useLogout'

interface DashboardTopbarProps {
  userName?: string
  userInitials?: string
  userAvatar?: string
}

export default function DashboardTopbar({ userName = 'User', userInitials = 'U', userAvatar }: DashboardTopbarProps) {
  const { data: user, isPending } = useGetUser()
  const { mutate } = useLogout()

  const handleLogout = () => {
    mutate()
  }

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
      <div className="flex items-center justify-between h-14 sm:h-16 w-full px-3 sm:px-4 md:px-8 max-w-[1440px] mx-auto" suppressHydrationWarning>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-base sm:text-lg font-bold text-primary">EduPro</span>
        </div>

        <div className="hidden sm:block ml-2 md:ml-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
          <NotificationDropdown />

          <div className="h-6 w-px bg-border mx-0.5 sm:mx-1 hidden md:block" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isPending ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <Button variant="ghost" className="gap-2 px-2 sm:px-3">
                  <Avatar className="size-7 sm:size-8">
                    {userAvatar ? (
                      <img src={userAvatar} alt={user?.data?.name ?? userName} className="size-full object-cover" />
                    ) : (
                      <AvatarFallback className="bg-primary text-white text-xs font-medium">
                        {user?.data?.name
                          ? user.data.name
                              .split(' ')
                              .map((n: string) => n[0])
                              .join('')
                              .toUpperCase()
                              .slice(0, 2)
                          : userInitials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm font-medium text-foreground hidden md:block">{user?.data?.name ?? userName}</span>
                  <ChevronDown className="size-4 text-muted-foreground hidden sm:block" />
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="/dashboard/settings" className="no-underline! w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
