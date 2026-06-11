import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import { Separator } from '#/components/ui/separator'
import { Card } from '#/components/ui/card'

import type { CourseInstructorBioProps } from '../../_types/courses.types'

export default function CourseInstructorBio({
  name,
  initials,
  rating,
  reviewCount,
  bio,
}: CourseInstructorBioProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-foreground mb-4">Instructor</h2>
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarFallback className="text-base bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-medium text-foreground">{rating}</span>
              <span>({reviewCount} reviews)</span>
            </div>
          </div>
        </div>
        <Separator className="my-5" />
        <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
      </Card>
    </section>
  )
}
