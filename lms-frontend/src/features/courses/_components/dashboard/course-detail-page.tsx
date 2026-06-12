import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ChevronRight,
  Pencil,
  MessageSquare,
  Play,
  FileText,
  ChevronDown,
  Users,
  CheckCircle2,
  MoreVertical,
} from 'lucide-react'
import type {
  DashboardCourseDetail,
  LessonItem,
} from '../../_types/dashboard-course-detail.types'
import { CourseDetailSkeleton } from '#/components/loading-skeleton'

interface CourseDetailPageProps {
  course?: DashboardCourseDetail
  isLoading?: boolean
}

function formatDuration(duration: string): string {
  return duration
}

const fileIconMap: Record<
  string,
  { Icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  picture_as_pdf: { Icon: FileText, color: 'text-error' },
  description: { Icon: FileText, color: 'text-primary' },
  article: { Icon: FileText, color: 'text-outline' },
}

function LessonRow({ lesson }: { lesson: LessonItem }) {
  return (
    <li className="flex items-center justify-between p-4 hover:bg-surface-container-lowest transition-colors border-b border-outline-variant last:border-0">
      <div className="flex items-center gap-3">
        {lesson.type === 'assignment' ? (
          <span className="material-symbols-outlined text-tertiary text-sm">
            assignment
          </span>
        ) : (
          <Play className="size-4 text-primary fill-primary" />
        )}
        <span className="text-sm text-on-surface">{lesson.title}</span>
      </div>
      {lesson.dueDate ? (
        <span className="text-xs font-semibold bg-tertiary-container text-on-tertiary-container px-2 py-1 rounded">
          Due {lesson.dueDate}
        </span>
      ) : (
        <span className="text-sm text-on-surface-variant">
          {lesson.duration}
        </span>
      )}
    </li>
  )
}

function ModuleCard({
  module,
}: {
  module: DashboardCourseDetail['modules'][0]
}) {
  const [expanded, setExpanded] = useState(module.isExpanded || false)

  return (
    <div className="border border-outline-variant rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-surface-container-low p-4 flex justify-between items-center hover:bg-surface-container transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-semibold">
            {module.id.replace('m', 'M')}
          </div>
          <div className="text-left">
            <h4 className="text-sm font-medium text-on-surface">
              {module.title}
            </h4>
            <p className="text-xs text-on-surface-variant">{module.subtitle}</p>
          </div>
        </div>
        <ChevronDown
          className={`size-5 text-secondary transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && (
        <div className="p-0">
          <ul className="flex flex-col">
            {module.lessons.map((lesson) => (
              <LessonRow key={lesson.id} lesson={lesson} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function CourseDetailPage({
  course,
  isLoading,
}: CourseDetailPageProps) {
  if (isLoading) return <CourseDetailSkeleton />
  if (!course) return null

  return (
    <main className="flex-1 p-4 md:p-8 w-full max-w-[1440px] mx-auto overflow-hidden">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex text-sm text-secondary mb-2">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link
              to="/dashboard/courses"
              className="hover:text-primary transition-colors text-sm"
            >
              Courses
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="size-4 mx-1 text-secondary" />
              <a
                href="#"
                className="hover:text-primary transition-colors text-sm"
              >
                {course.category}
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="size-4 mx-1 text-secondary" />
              <span className="text-sm text-on-surface">{course.title}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
            {course.title}
          </h1>
          <p className="text-base text-on-surface-variant mt-1">
            {course.code} • {course.semester} • {course.credits} Credits
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface-container-low hover:bg-surface-container text-on-surface text-sm font-medium py-2 px-4 rounded-lg transition-colors border border-outline-variant flex items-center gap-2">
            <Pencil className="size-4" />
            Edit Course
          </button>
          <button className="bg-primary hover:bg-surface-tint text-on-primary text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
            <MessageSquare className="size-4" />
            Message Students
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* About Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-low p-6">
            <h2 className="text-lg font-semibold text-on-surface mb-4">
              About this Course
            </h2>

            <div className="relative w-full h-48 rounded-lg mb-4 overflow-hidden bg-surface-variant group cursor-pointer">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all group-hover:bg-black/40">
                <div className="size-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform">
                  <Play className="size-8 text-white fill-white ml-0.5" />
                </div>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
              {course.description}
            </p>

            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-outline-variant">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="size-12 rounded-full object-cover border border-outline-variant"
              />
              <div>
                <h3 className="text-sm font-medium text-on-surface">
                  {course.instructor.name}
                </h3>
                <p className="text-xs text-on-surface-variant">
                  {course.instructor.title}
                </p>
              </div>
            </div>
          </div>

          {/* Resources Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-low p-6">
            <h2 className="text-lg font-semibold text-on-surface mb-4">
              Course Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.resources.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-secondary mb-3 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {section.resources.map((resource) => {
                      const iconInfo = fileIconMap[resource.icon] || {
                        Icon: FileText,
                        color: 'text-on-surface-variant',
                      }
                      const IconComp = iconInfo.Icon
                      return (
                        <li
                          key={resource.id}
                          className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
                        >
                          <IconComp className={`size-5 ${iconInfo.color}`} />
                          <span className="text-sm text-on-surface">
                            {resource.name}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-low p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-on-surface">
                Syllabus & Modules
              </h2>
              <button className="text-sm font-medium text-primary hover:underline">
                Expand All
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {course.modules.map((mod) => (
                <ModuleCard key={mod.id} module={mod} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest rounded-xl shadow-low p-4 flex flex-col justify-center items-center text-center">
              <Users className="size-8 text-primary mb-2" />
              <span className="text-2xl font-bold text-on-surface">
                {course.stats.enrolledStudents}
              </span>
              <span className="text-xs text-on-surface-variant mt-1">
                Enrolled Students
              </span>
            </div>
            <div className="bg-surface-container-lowest rounded-xl shadow-low p-4 flex flex-col justify-center items-center text-center">
              <CheckCircle2 className="size-8 text-tertiary mb-2" />
              <span className="text-2xl font-bold text-on-surface">
                {course.stats.avgCompletion}%
              </span>
              <span className="text-xs text-on-surface-variant mt-1">
                Avg. Completion
              </span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-surface-container-lowest rounded-xl shadow-low flex flex-col h-full min-h-[400px]">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-base font-semibold text-on-surface">
                Recent Activity
              </h2>
              <button className="p-1 text-on-surface-variant hover:bg-surface-container rounded transition-colors">
                <MoreVertical className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {course.activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  {activity.avatar ? (
                    <img
                      src={activity.avatar}
                      alt={activity.name}
                      className="size-10 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className={`size-10 rounded-full shrink-0 flex items-center justify-center text-sm font-medium ${
                        activity.avatarBg || 'bg-surface-variant'
                      } ${activity.avatarColor || 'text-on-surface-variant'}`}
                    >
                      {activity.initials}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-on-surface truncate">
                      {activity.name}
                    </p>
                    <p className="text-xs text-on-surface-variant truncate">
                      {activity.action}
                    </p>
                  </div>
                  <span className="text-xs text-secondary shrink-0">
                    {activity.timestamp}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-outline-variant">
              <button className="w-full py-2 text-sm font-medium text-primary hover:bg-primary-container hover:text-on-primary-container rounded-lg transition-colors">
                View All Students
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
