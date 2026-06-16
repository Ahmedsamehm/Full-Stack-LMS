import { useRouter, useSearch } from '@tanstack/react-router'
import SearchBar from '#/components/search-bar'
import { Button } from '#/components/ui/button'
import type { Category } from '#/schemas'

interface CourseFilterProps {
  categories: Category[]
}

export default function CourseFilter({ categories }: CourseFilterProps) {
  const search = useSearch({ from: '/_public/_courses/courses' }) as Record<string, unknown>
  const router = useRouter()
  const activeCategoryId = search?.categoryId as string | undefined

  const handleCategoryClick = (categoryId: string | undefined) => {
    router.navigate({
      to: '/courses',
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        categoryId: categoryId || undefined,
        page: 1,
      }),
    })
  }

  return (
    <div className="flex flex-col gap-4 mb-8 items-center justify-center w-full" suppressHydrationWarning>
      <div className="relative flex-1 max-w-2xl! w-full mb-5 ">
        <SearchBar />
      </div>

      <div className="flex gap-2 overflow-x-auto w-full justify-center items-center">
        <Button
          variant={!activeCategoryId ? 'default' : 'outline'}
          size="sm"
          className={`shrink-0 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
            !activeCategoryId ? 'text-white' : ''
          }`}
          onClick={() => handleCategoryClick(undefined)}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            variant={activeCategoryId === cat.id || activeCategoryId === cat.name ? 'default' : 'outline'}
            size="sm"
            className={`shrink-0 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategoryId === cat.id || activeCategoryId === cat.name ? 'text-white' : ''
            }`}
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
          >
            {cat.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
