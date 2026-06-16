import { SlidersHorizontal } from 'lucide-react'
import SearchBar from '#/components/search-bar'

interface EnrollmentsFilterBarProps {
  search: string
  status: string
  onStatusChange: (val: string) => void
  onClear: () => void
}

export default function EnrollmentsFilterBar({ search, status, onStatusChange, onClear }: EnrollmentsFilterBarProps) {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(15,23,42,0.02)] flex flex-col sm:flex-row gap-4 justify-between items-center w-full">
      <div className="w-full sm:max-w-2xl">
        <SearchBar placeholder="Search student or course..." />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <span className="text-xs font-semibold text-on-surface-variant shrink-0">Filter by:</span>

        <div className="relative min-w-[140px] flex-1 sm:flex-initial">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full appearance-none bg-surface border border-outline-variant text-on-surface py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="EXPIRED">Expired</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <SlidersHorizontal className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none size-4" />
        </div>

        {(search || status) && (
          <button onClick={onClear} className="text-primary hover:text-primary-hover text-xs font-semibold cursor-pointer shrink-0">
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
