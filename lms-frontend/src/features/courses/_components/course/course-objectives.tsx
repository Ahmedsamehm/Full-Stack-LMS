import { CheckCircle2 } from 'lucide-react'

import type { CourseObjectivesProps } from '../../_types/courses.types'

export default function CourseObjectives({ objectives }: CourseObjectivesProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-foreground mb-4">What You&apos;ll Learn</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {objectives.map((objective, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">{objective}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
