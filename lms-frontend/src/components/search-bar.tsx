import { Search } from 'lucide-react'

import { Input } from '#/components/ui/input'

export default function SearchBar() {
  return (
    <div className="relative max-w-3xl! w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder="Search courses..."
        className="pl-10 h-10 max-w-2xl! w-full rounded-lg bg-muted/50"
        aria-label="Search courses"
      />
    </div>
  )
}
