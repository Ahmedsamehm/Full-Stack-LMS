import SearchBar from '#/components/search-bar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import { Button } from '#/components/ui/button'
import { X } from 'lucide-react'

interface UsersFilterBarProps {
  search: string
  role?: string
  onRoleChange: (val: string) => void
  onClear: () => void
}

export default function UsersFilterBar({ search, role, onRoleChange, onClear }: UsersFilterBarProps) {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(15,23,42,0.02)] flex flex-col sm:flex-row gap-4 justify-between items-center w-full">
      <div className="w-full sm:max-w-2xl">
        <SearchBar placeholder="Search by name or email..." />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Select value={role || 'ALL'} onValueChange={(val: string) => onRoleChange(val === 'ALL' ? '' : val)}>
          <SelectTrigger className="w-full sm:w-[180px] bg-surface h-11">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value="Super_Admin">Super Admin</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Teacher">Teacher</SelectItem>
            <SelectItem value="Student">Student</SelectItem>
          </SelectContent>
        </Select>

        {(search || role) && (
          <Button variant="ghost" onClick={onClear} className="text-on-surface-variant hover:text-on-surface px-3">
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
