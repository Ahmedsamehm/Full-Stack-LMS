import { MoreVertical } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { ContinueLearningSkeleton } from '#/components/loading-skeleton'
import { EmptyState } from '#/components/empty-state'
import { ProgressBar } from '../shared/progress-bar'

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
    return <ContinueLearningSkeleton />
  }

  if (!course) {
    return (
      <EmptyState
        title="No course in progress"
        message="Start a course to continue your learning journey."
      />
    )
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[40%] h-48 md:h-auto bg-muted relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover opacity-90"
          />
          <Badge
            variant="secondary"
            className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 backdrop-blur-md border border-border/50"
          >
            {course.category}
          </Badge>
        </div>

        <CardContent className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              {course.title}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="shrink-0">
                  <MoreVertical className="size-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Bookmark</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Unenroll
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-sm text-muted-foreground mb-4 sm:mb-6 line-clamp-2">
            {course.description}
          </p>

          <div className="mt-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Module {course.currentModule} of {course.totalModules}
              </span>
              <span className="text-xs sm:text-sm font-bold text-primary">
                {course.progress}%
              </span>
            </div>

            <ProgressBar value={course.progress} barColor="bg-primary" className="mb-4 sm:mb-6" />

            <Button className="w-full sm:w-auto">
              Resume Course
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
