import { Search, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import NotificationDropdown from '#/features/notifications/_components/notification-dropdown'
import { useGetUser } from '#/features/users/_hooks/useGetUser'
import { Skeleton } from '#/components/ui/skeleton'

interface DashboardTopbarProps {
  userName?: string
  userInitials?: string
  userAvatar?: string
}

export default function DashboardTopbar({
  userName = 'User',
  userInitials = 'U',
  userAvatar,
}: DashboardTopbarProps) {
  const {data:user ,isPending} = useGetUser()

  

  return (
    <header className="bg-white/30 backdrop-blur-sm border-b border-outline-variant sticky top-0 z-40">
      <div
        className="flex items-center justify-between h-16 w-full px-4 md:px-8 max-w-360 mx-auto"
        suppressHydrationWarning
      >
        <div className="flex items-center gap-4 ">
          <span className="text-lg font-bold text-primary lg:block">
            EduPro
          </span>
        </div>
        <div className="relative ml-0 md:ml-4 sm:block ">
          <Search className="absolute hidden md:block left-3 top-1/2 -translate-y-1/2 text-on-surface-variant size-4" />
          <input
            type="text"
            placeholder="Search courses, students..."
            className="bg-surface-container-low border border-outline-variant rounded-full py-2 px-3 md:pl-10 pr-4 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all md:w-80  xl:w-200 "
          />
        </div>
        <div className="flex items-center gap-2 md:gap-4 ">
          <NotificationDropdown  />
          {/* <button className="size-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors hidden sm:flex">
            <HelpCircle className="size-5" />
          </button> */}

          <div className="h-6 w-px bg-outline-variant mx-1 hidden md:block" />

          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
           
              {isPending?
              <Skeleton className="h-3 w-24" />

              
              :  
              <>
              
               <Avatar className="size-8">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="size-full object-cover"
                />
              ) : (
                <AvatarFallback className="bg-primary text-white text-xs font-medium">
                  {userInitials}
                </AvatarFallback>
              )}
            </Avatar>
              
              <span className="text-sm font-medium text-on-surface hidden md:block">
              {user.data.name}
            </span>
              </>
              }
           
            <ChevronDown className="size-4 text-on-surface-variant hidden md:block" />
          </button>
        </div>
      </div>
    </header>
  )
}
