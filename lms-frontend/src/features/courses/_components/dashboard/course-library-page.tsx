import { Link } from '@tanstack/react-router'
import { Search, ArrowRight, Plus, Filter } from 'lucide-react'

import type { DashboardCourse } from '../../_types/dashboard-courses.types'
import { CourseGridSkeleton } from '#/components/loading-skeleton'

interface CourseLibraryPageProps {
  courses?: DashboardCourse[]
  isLoading?: boolean
}

const categoryBadgeClasses: Record<string, string> = {
  Science: 'bg-primary-container text-on-primary-container',
  Technology: 'bg-secondary-container text-on-secondary-container',
  Languages: 'bg-tertiary-container text-on-tertiary-container',
  Business: 'bg-surface-tint/20 text-surface-tint',
}

function CategoryBadge({ category }: { category: string }) {
  const cls = 'bg-primary! text-white text-on-surface-variant '
  return (
    <span
      className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-md ${cls}`}
    >
      {category}
    </span>
  )
}

function CourseCard({ course }: { course: DashboardCourse }) {
  return (
    <Link to={`${course.id}`} className="no-underline!">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col shadow-[0_2px_4px_rgba(15,23,42,0.04)] hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)] transition-shadow duration-300">
        <div className="h-40 w-full relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <CategoryBadge category={course.category} />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-on-surface mb-2 line-clamp-2">
            {course.title}
          </h3>

          <div className="flex items-center gap-2 mb-4">
            <div className="size-6 rounded-full bg-surface-variant overflow-hidden">
              <img
                src={course.instructorAvatar}
                alt={course.instructorName}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-on-surface-variant">
              {course.instructorName}
            </span>
          </div>

          <div className="flex justify-between items-center mt-auto pt-4 border-t border-outline-variant">
            <div className="flex items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">
                group
              </span>
              <span className="text-sm font-medium">
                {course.enrolledCount} Enrolled
              </span>
            </div>
            <div
              className="text-sm font-medium text-primary hover:text-primary-container transition-colors flex items-center gap-1 no-underline!"
            >
              View Details
              <ArrowRight className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function CourseLibraryPage({
  courses,
  isLoading,
}: CourseLibraryPageProps) {
  return (
    <div className="flex-1 overflow-y-auto w-full">
      <div className="px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
        {/* Page Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-1">
              Course Library
            </h1>
            <p className="text-base text-on-surface-variant">
              Manage, update, and monitor your academic offerings.
            </p>
          </div>
          <button className="lg:hidden  flex items-center justify-center gap-2 bg-primary text-white text-sm font-medium py-3 px-5 rounded-lg hover:bg-primary/90 transition-colors w-full md:w-auto">
            <Plus className="size-[18px]" />
            Create New Course
          </button>
        </div>

        {/* Filters Bar */}
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant size-4" />
            <input
              type="text"
              placeholder="Find a course..."
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
          </div>
          <div className="w-full md:w-auto flex flex-1 gap-4">
            <select className="flex-1 md:w-48 py-2.5 px-4 bg-background border border-outline-variant rounded-lg text-sm text-on-surface focus:border-primary outline-none appearance-none cursor-pointer">
              <option value="">All Categories</option>
              <option value="science">Science</option>
              <option value="languages">Languages</option>
              <option value="tech">Technology</option>
            </select>
            <select className="flex-1 md:w-48 py-2.5 px-4 bg-background border border-outline-variant rounded-lg text-sm text-on-surface focus:border-primary outline-none appearance-none cursor-pointer">
              <option value="">All Instructors</option>
              <option value="1">Dr. Sarah Jenkins</option>
              <option value="2">Prof. Marcus Cole</option>
            </select>
          </div>
          <button className="w-full md:w-auto px-6 py-2.5 bg-surface-container text-on-surface text-sm font-medium rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
            <Filter className="size-[18px]" />
            More Filters
          </button>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <CourseGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
            {courses?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
