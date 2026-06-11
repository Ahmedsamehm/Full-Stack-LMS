import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '#/components/ui/button'

export default function Pagination() {
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 pt-8 pb-4"
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="default"
        size="icon"
        className="h-9 w-9 text-sm text-white"
        aria-label="Page 1"
        aria-current="page"
      >
        1
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-sm"
        aria-label="Page 2"
      >
        2
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-sm"
        aria-label="Page 3"
      >
        3
      </Button>

      <span className="flex h-9 items-center px-1 text-sm text-muted-foreground">
        ...
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-sm"
        aria-label="Page 5"
      >
        5
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}
