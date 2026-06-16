import { getPageNumbers } from '#/hooks/usegetPageNumbers'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// interface PaginationProps {
//   pageCount?: number
//   meta?: {
//     totalPages?: number
//     page?: number
//     limit?: number
//     total?: number
//   }
//   className?: string
// }

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)

  return (
    <nav className={`flex items-center justify-center gap-1 ${className}`}>
      {/* Prev */}
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1} className="px-3 py-2 text-sm disabled:opacity-50">
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Pages */}
      <div className="flex items-center gap-1">
        {pages.map((page, idx) =>
          page === 'ellipsis' ? (
            <span key={`e-${idx}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[40px] px-3 py-2 cursor-pointer text-sm rounded ${currentPage === page ? 'bg-primary text-white' : 'hover:bg-gray-500/50'}`}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-2 text-sm disabled:opacity-50 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  )
}
