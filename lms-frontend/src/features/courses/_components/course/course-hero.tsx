import { Link } from '@tanstack/react-router'
import { Users, Star } from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'

import type { CourseHeroProps } from '../../_types/courses.types'

export default function CourseHero({ course }: CourseHeroProps) {
  return (
    <section className="bg-gradient-to-br from-blue-600/20 via-primary/5 to-transparent px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/courses" className="hover:text-foreground transition-colors no-underline!">
            Courses
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[300px]">
            {course.title}
          </span>
        </div>

        <div className="max-w-3xl space-y-6">
          <Badge variant="development" className="w-fit">
            {course.category}
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {course.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2.5">
              <Avatar className="size-9">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {course.instructor.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">{course.instructor.name}</span>
            </div>

            <div className="flex items-center gap-1.5 text-sm">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-medium text-foreground">{course.instructor.rating}</span>
              <span className="text-muted-foreground">
                ({course.instructor.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="size-4" />
              <span>{course.stats.enrollments.toLocaleString()} enrolled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
