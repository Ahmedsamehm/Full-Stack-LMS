import { useState } from 'react'
import { ChevronDown, FileText, PlayCircle } from 'lucide-react'
import { cn } from '#/lib/utils'

import type { CourseDetailLesson, CourseCurriculumProps } from '../../_types/courses.types'

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}min` : `${m}min`
}

function LessonItem({ lesson }: { lesson: CourseDetailLesson }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/50 transition-colors"
      >
        <ChevronDown
          className={cn(
            'size-4 text-muted-foreground shrink-0 transition-transform duration-200',
            expanded && 'rotate-0',
            !expanded && '-rotate-90',
          )}
        />
        <PlayCircle className="size-4 text-muted-foreground shrink-0" />
        <span className="flex-1 text-sm font-medium text-foreground">
          Lesson {lesson.orderIndex}: {lesson.title}
        </span>
        <span className="text-xs text-muted-foreground shrink-0">
          {formatDuration(lesson.duration)}
        </span>
      </button>

      {expanded && (
        <div className="px-5 pb-4 pl-14 space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">{lesson.description}</p>
          {lesson.pdfUrl && (
            <a
              href={lesson.pdfUrl}
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <FileText className="size-4" />
              Download lesson PDF
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default function CourseCurriculum({
  lessons,
  totalLessons,
  totalDuration,
}: CourseCurriculumProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-foreground">Course Curriculum</h2>
        <span className="text-sm text-muted-foreground">
          {totalLessons} lessons &bull; {formatDuration(totalDuration)}
        </span>
      </div>

      <div className="border border-border rounded-xl divide-y divide-border overflow-hidden bg-card">
        {lessons
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
      </div>
    </section>
  )
}
