import { useState } from 'react'
import { Plus } from 'lucide-react'
import { ModuleCard } from '#/features/lessons/_components/module-card'
import { Button } from '#/components/ui/button'
import { Accordion } from '#/components/ui/accordion'
import type { DashboardCourseDetail } from '#/schemas'

interface CourseSyllabusProps {
  modules: DashboardCourseDetail['modules']
  canManage?: boolean
  onAddLesson?: () => void
  onEditLesson?: (lesson: DashboardCourseDetail['modules'][0]['lessons'][0]) => void
  onDeleteLesson?: (lessonId: string) => void
}

export function CourseSyllabus({ modules, canManage, onAddLesson, onEditLesson, onDeleteLesson }: CourseSyllabusProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(modules.filter((m) => m.isExpanded).map((m) => m.id))

  const handleExpandToggle = () => {
    if (expandedIds.length === modules.length) {
      setExpandedIds([])
    } else {
      setExpandedIds(modules.map((m) => m.id))
    }
  }

  const isAllExpanded = expandedIds.length === modules.length

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-low p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-on-surface">Syllabus & Modules</h2>
        <div className="flex gap-3">
          {canManage && (
            <Button onClick={onAddLesson} size="sm" className="flex items-center gap-1 text-white!">
              <Plus className="size-3.5" />
              Add Lesson
            </Button>
          )}
          <Button variant="link" size="sm" className="text-sm font-medium hover:no-underline! cursor-pointer" onClick={handleExpandToggle}>
            {isAllExpanded ? 'Collapse All' : 'Expand All'}
          </Button>
        </div>
      </div>
      <Accordion type="multiple" value={expandedIds} onValueChange={setExpandedIds} className="w-full flex flex-col gap-3">
        {modules.map((mod) => (
          <ModuleCard key={mod.id} module={mod} canManage={canManage} onEditLesson={onEditLesson} onDeleteLesson={onDeleteLesson} />
        ))}
      </Accordion>
    </div>
  )
}
