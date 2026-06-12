import { categories } from '../../_data/courses.mock'
import SearchBar from '#/components/search-bar'
import { Button } from '#/components/ui/button'

export default function CourseFilter() {
  return (
    <div className="flex flex-col gap-4 mb-8 items-center justify-center w-full" suppressHydrationWarning>
      <div className="relative flex-1 max-w-2xl! w-full mb-5 ">
        <SearchBar />
      </div>

      <div className="flex gap-2 overflow-x-auto w-full justify-center items-center">
        {categories.map((cat) => (
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap"
            key={cat.slug}
          >
            {cat.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
