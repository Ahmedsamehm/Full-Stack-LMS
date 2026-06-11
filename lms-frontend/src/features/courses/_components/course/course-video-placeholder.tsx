import { Play } from 'lucide-react'

export default function CourseVideoPlaceholder() {
  return (
    <div className="aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center gap-3">
      <div className="flex items-center justify-center size-16 rounded-full bg-white/10">
        <Play className="size-7 text-white fill-white ml-0.5" />
      </div>
      <span className="text-sm text-zinc-400 font-medium">
        Preview this course
      </span>
    </div>
  )
}
