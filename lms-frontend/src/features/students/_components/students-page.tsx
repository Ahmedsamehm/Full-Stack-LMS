import { Download, UserPlus } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { Pagination } from '#/components/pagination'
import { useAuthStore, type Role } from '#/store/auth'

import { useStudentManagement } from '../_hooks/use-student-management'

import StudentsFilterBar from './students-filter-bar'
import StudentsTable from './students-table'

const allowedRoles: Role[] = ['Admin', 'Teacher']

export default function StudentsPage() {
  const role = useAuthStore((s) => s.role)
  const { data, isLoading } = useStudentManagement()

  if (!allowedRoles.includes(role)) {
    return (
      <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg font-medium text-on-surface-variant">
            You do not have access to this page.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-1">
            Students Directory
          </h1>
          <p className="text-base text-on-surface-variant">
            Manage and monitor student enrollments and progress.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="gap-2">
            <Download className="size-4" />
            Export
          </Button>
          <Button className="gap-2 text-white!">
            <UserPlus className="size-4" />
            Add Student
          </Button>
        </div>
      </div>

      <StudentsFilterBar />

      <StudentsTable students={data?.students} isLoading={isLoading} />

      <Pagination pageCount={Math.ceil((data?.totalCount ?? 0) / 10)} />
    </main>
  )
}
