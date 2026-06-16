import SearchBar from '#/components/search-bar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'

interface StudentsFilterBarProps {
  courses?: { id: string; title: string }[]
}

export default function StudentsFilterBar({ courses = [] }: StudentsFilterBarProps) {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(15,23,42,0.02)] flex flex-col lg:flex-row gap-4 justify-between items-center">
      <SearchBar placeholder="Search students..." />

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        <span className="text-xs font-semibold text-on-surface-variant mr-1">Filter by:</span>

        <Select>
          <SelectTrigger className="w-full min-w-[140px] lg:w-auto">
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
