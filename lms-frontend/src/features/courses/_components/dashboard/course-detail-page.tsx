import { CourseDetailSkeleton } from '#/components/loading-skeleton'
import { useAuthStore } from '#/store/auth'
import { canManageRole } from '#/lib/auth'
import { ConfirmDeleteDialog } from '#/components/confirm-delete-dialog'

import { CourseAbout } from './courseDetails/course-about'
import { CourseResources } from './courseDetails/course-resources'
import { CourseSyllabus } from './courseDetails/course-syllabus'
import { CourseStats } from './courseDetails/course-stats'
import { RecentActivityCard } from './courseDetails/recent-activity-card'
import { CourseBreadcrumbs } from './courseDetails/course-breadcrumbs'
import { CourseHeader } from './courseDetails/course-header'
import { CreateLessonDialog } from '#/features/lessons/_components/create-lesson-dialog'
import { useLessonActions } from '#/features/lessons/_hooks/useLessonActions'
import type { DashboardCourseDetail } from '#/schemas'

interface CourseDetailPageProps {
  course?: DashboardCourseDetail
  isLoading?: boolean
}

export default function CourseDetailPage({ course, isLoading }: CourseDetailPageProps) {
  const role = useAuthStore((s) => s.role)
  const canManage = canManageRole(role)

  const {
    isLessonDialogOpen,
    setIsLessonDialogOpen,
    lessonToEdit,
    setLessonToEdit,
    lessonToDelete,
    setLessonToDelete,
    handleDeleteLesson,
    handleAddLesson,
    handleEditLesson,
  } = useLessonActions(course?.id ?? '')

  if (isLoading) return <CourseDetailSkeleton />
  if (!course) return null

  return (
    <main className="flex-1 p-4 md:p-8 w-full max-w-[1440px] mx-auto overflow-hidden">
      <CourseBreadcrumbs category={course.category} title={course.title} />

      <CourseHeader course={course} canManage={canManage} />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* About Card */}
          <CourseAbout course={course} />

          {/* Resources Card */}
          <CourseResources resources={course.resources} />

          {/* Syllabus Card */}
          <CourseSyllabus
            modules={course.modules}
            canManage={canManage}
            onAddLesson={handleAddLesson}
            onEditLesson={handleEditLesson}
            onDeleteLesson={(id) => setLessonToDelete(id)}
          />
        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Stats Grid */}
          <CourseStats stats={course.stats} />

          {/* Recent Activity */}
          <RecentActivityCard courseId={course.id} />
        </div>
      </div>

      <CreateLessonDialog
        courseId={course.id}
        open={isLessonDialogOpen}
        onOpenChange={(open) => {
          setIsLessonDialogOpen(open)
          if (!open) setLessonToEdit(null)
        }}
        lessonToEdit={lessonToEdit}
      />

      <ConfirmDeleteDialog
        open={!!lessonToDelete}
        onOpenChange={(open) => !open && setLessonToDelete(null)}
        title="Delete Lesson"
        description="Are you sure you want to delete this lesson? This action cannot be undone."
        onConfirm={handleDeleteLesson}
      />
    </main>
  )
}
