import { Search } from 'lucide-react'
import { useRouter, useSearch } from '@tanstack/react-router'
import { useDebouncedCallback } from 'use-debounce'
import { useState, useEffect } from 'react'

import { Input } from '#/components/ui/input'

interface SearchBarProps {
  placeholder?: string
}

export default function SearchBar({ placeholder = 'Search courses...' }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearch({ strict: false })
  const [value, setValue] = useState(String((searchParams as Record<string, unknown>).search ?? ''))

  useEffect(() => {
    setValue(String((searchParams as Record<string, unknown>).search ?? ''))
  }, [searchParams])

  const debouncedSearch = useDebouncedCallback((searchStr: string) => {
    router.navigate({
      search: (prev: any) => ({
        ...prev,
        search: searchStr || undefined,
        page: 1,
      }),
    } as any)
  }, 350)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setValue(val)
    debouncedSearch(val)
  }

  return (
    <div className="relative max-w-3xl! w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-10 h-10 max-w-2xl! w-full rounded-lg bg-muted/50"
        aria-label={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
