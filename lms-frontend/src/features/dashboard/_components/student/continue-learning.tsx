import { MoreVertical } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Skeleton } from '#/components/ui/skeleton'

import type { ContinueLearning } from '../../_types/student.types'

interface ContinueLearningProps {
  course?: ContinueLearning
  isLoading: boolean
}

export default function ContinueLearningCard({
  course,
  isLoading,
}: ContinueLearningProps) {
  if (isLoading) {
    return (
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col md:flex-row">
        <Skeleton className="md:w-[40%] h-48 md:h-auto" />
        <div className="p-6 flex-1 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    )
  }

  if (!course) return null

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col md:flex-row relative">
      <div className="md:w-[40%] h-48 md:h-auto bg-surface-container-low relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-on-surface border border-outline-variant/50">
          {course.category}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-on-surface">
            {course.title}
          </h3>
          <button className="text-on-surface-variant hover:bg-surface-container p-2 rounded-full transition-colors">
            <MoreVertical className="size-5" />
          </button>
        </div>

        <p className="text-md text-on-surface-variant mb-6 w-full">
          {course.description}
        </p>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-on-surface-variant">
              Module {course.currentModule} of {course.totalModules}
            </span>
            <span className="text-sm font-bold text-primary">
              {course.progress}%
            </span>
          </div>

          <div className="w-full bg-surface-container-high rounded-full h-2 mb-6">
            <div
              className="bg-primary-container h-2 rounded-full"
              style={{ width: `${course.progress}%` }}
            />
          </div>

          <Button className="bg-primary-container! text-white! hover:bg-primary text-on-primary rounded-lg text-sm font-medium px-6 py-2 w-full md:w-auto transition-colors">
            Resume Course
          </Button>
        </div>
      </div>
    </div>
  )
}
