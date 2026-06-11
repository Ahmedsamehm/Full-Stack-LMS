import { Search, SlidersHorizontal } from 'lucide-react'

export default function StudentsFilterBar() {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(15,23,42,0.02)] flex flex-col lg:flex-row gap-4 justify-between items-center">
      <div className="w-full lg:hidden relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none size-4" />
        <input
          type="text"
          placeholder="Search students..."
          className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-on-surface placeholder:text-on-surface-variant"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        <span className="text-xs font-semibold text-on-surface-variant mr-1">
          Filter by:
        </span>

        <div className="relative min-w-[140px]">
          <select className="w-full appearance-none bg-surface border border-outline-variant text-on-surface py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
            <option value="">All Courses</option>
            <option value="cs101">Computer Science 101</option>
            <option value="math202">Advanced Mathematics</option>
            <option value="lit105">World Literature</option>
          </select>
          <SlidersHorizontal className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none size-4" />
        </div>

        <div className="relative min-w-[140px]">
          <select className="w-full appearance-none bg-surface border border-outline-variant text-on-surface py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
            <option value="">Grade Level</option>
            <option value="freshman">Freshman</option>
            <option value="sophomore">Sophomore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
          </select>
          <SlidersHorizontal className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none size-4" />
        </div>

        <button className="text-primary hover:text-primary/80 text-xs font-semibold ml-auto lg:ml-2">
          Clear
        </button>
      </div>
    </div>
  )
}
