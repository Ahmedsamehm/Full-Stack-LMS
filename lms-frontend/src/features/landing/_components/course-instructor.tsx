import { Star } from 'lucide-react'

import { Avatar, AvatarFallback } from '#/components/ui/avatar'

interface CourseInstructorProps {
  name: string
  initials: string
  rating: number
  reviewCount: number
}

export default function CourseInstructor({ name, initials, rating, reviewCount }: CourseInstructorProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs bg-primary/10 text-primary">{initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium">{rating}</span>
          <span className="text-muted-foreground/60">({reviewCount} reviews)</span>
        </div>
      </div>
    </div>
  )
}
