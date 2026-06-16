import { Play } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import type { DashboardCourseDetail } from '#/schemas'

interface CourseAboutProps {
  course: DashboardCourseDetail
}

export function CourseAbout({ course }: CourseAboutProps) {
  const initials = course.instructor.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-low p-6">
      <h2 className="text-lg font-semibold text-on-surface mb-4">About this Course</h2>

      <div className="relative w-full h-48 rounded-lg mb-4 overflow-hidden bg-surface-variant group cursor-pointer">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all group-hover:bg-black/40">
          <div className="size-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform">
            <Play className="size-8 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>

      <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">{course.description}</p>

      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-outline-variant">
        <Avatar className="size-12 border border-outline-variant">
          <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-medium text-on-surface">{course.instructor.name}</h3>
          <p className="text-xs text-on-surface-variant">{course.instructor.title}</p>
        </div>
      </div>
    </div>
  )
}
