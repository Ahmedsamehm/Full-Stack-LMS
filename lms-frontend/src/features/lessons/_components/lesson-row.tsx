import { Play, Pencil, Trash2, FileText } from 'lucide-react'
import { Button } from '#/components/ui/button'
import type { LessonItem } from '../_types/lesson.types'

interface LessonRowProps {
  lesson: LessonItem
  canManage?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export function LessonRow({ lesson, canManage, onEdit, onDelete }: LessonRowProps) {
  return (
    <li className="flex items-center justify-between p-4 hover:bg-surface-container-lowest transition-colors border-b border-outline-variant last:border-0">
      <div className="flex items-center gap-3">
        {lesson.type === 'assignment' ? <FileText className="size-4 text-tertiary" /> : <Play className="size-4 text-primary fill-primary" />}
        <span className="text-sm text-on-surface">{lesson.title}</span>
      </div>
      <div className="flex items-center gap-3">
        {lesson.dueDate ? (
          <span className="text-xs font-semibold bg-tertiary-container text-on-tertiary-container px-2 py-1 rounded">Due {lesson.dueDate}</span>
        ) : (
          <span className="text-sm text-on-surface-variant">{lesson.duration}</span>
        )}
        {canManage && (
          <div className="flex gap-1.5 ml-2">
            <Button variant="ghost" size="icon" onClick={onEdit} title="Edit Lesson" className="size-7">
              <Pencil className="size-3.5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete} title="Delete Lesson" className="size-7 hover:text-error hover:bg-error/5">
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        )}
      </div>
    </li>
  )
}
