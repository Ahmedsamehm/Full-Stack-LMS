import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import SearchBar from '#/components/search-bar'
import { isStudent, isTeacherRole } from '#/lib/auth'
import type { Category, Roles } from '#/schemas'
import type { User } from '#/schemas'

interface CourseFiltersBarProps {
  role: Roles | null
  categoryId: string
  teacherId: string
  status: string
  categories: Category[]
  instructors: User[]
  onFilterChange: (key: 'categoryId' | 'teacherId' | 'status' | 'search', value: string | undefined) => void
}

export default function CourseFiltersBar({ role, categoryId, teacherId, status, categories, instructors, onFilterChange }: CourseFiltersBarProps) {
  const isStudentRole = isStudent(role)
  const isTeacher = isTeacherRole(role)

  const categoryValue = categoryId || 'all'
  const statusValue = status || 'all'
  const teacherValue = teacherId || 'all'

  return (
    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex flex-col md:flex-row gap-4 items-center">
      <SearchBar />
      <div className="w-full md:w-auto flex flex-1 gap-4 items-center">
        <Select value={categoryValue} onValueChange={(val) => onFilterChange('categoryId', val === 'all' ? undefined : val)}>
          <SelectTrigger className="flex-1 md:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {!isStudentRole && (
          <Select value={statusValue} onValueChange={(val) => onFilterChange('status', val === 'all' ? undefined : val)}>
            <SelectTrigger className="flex-1 md:w-48">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="DRAFT">Draft (On Holding)</SelectItem>
            </SelectContent>
          </Select>
        )}

        {!isTeacher && (
          <Select value={teacherValue} onValueChange={(val) => onFilterChange('teacherId', val === 'all' ? undefined : val)}>
            <SelectTrigger className="flex-1 md:w-48">
              <SelectValue placeholder="All Instructors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Instructors</SelectItem>
              {instructors.map((inst) => (
                <SelectItem key={inst.id} value={inst.id}>
                  {inst.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  )
}
