import { LessonRow } from './lesson-row'
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '#/components/ui/accordion'
import type { DashboardCourseDetail } from '#/schemas'

interface ModuleCardProps {
  module: DashboardCourseDetail['modules'][0]
  canManage?: boolean
  onEditLesson?: (lesson: DashboardCourseDetail['modules'][0]['lessons'][0]) => void
  onDeleteLesson?: (lessonId: string) => void
}

export function ModuleCard({
  module,
  canManage,
  onEditLesson,
  onDeleteLesson,
}: ModuleCardProps) {
  return (
    <AccordionItem
      value={module.id}
      className="border border-outline-variant rounded-lg overflow-hidden bg-white [&[data-state=open]]:border-primary/40 transition-colors"
    >
      <AccordionTrigger className="w-full bg-surface-container-low p-4 flex justify-between items-center hover:bg-surface-container transition-colors rounded-none hover:no-underline text-foreground [&>svg]:size-5 [&>svg]:text-secondary">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-semibold shrink-0">
            {module.id.replace('m', 'M')}
          </div>
          <div className="text-left">
            <h4 className="text-sm font-semibold text-on-surface">
              {module.title}
            </h4>
            <p className="text-xs text-on-surface-variant font-normal">{module.subtitle}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-0 border-t border-outline-variant/60">
        <ul className="flex flex-col">
          {module.lessons.map((lesson) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              canManage={canManage}
              onEdit={() => onEditLesson?.(lesson)}
              onDelete={() => onDeleteLesson?.(lesson.id)}
            />
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}
