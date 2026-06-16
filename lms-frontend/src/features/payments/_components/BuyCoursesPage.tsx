import { useEffect } from 'react'
import { ShoppingCart, CheckCircle, Sparkles, Star } from 'lucide-react'
import { toast } from 'sonner'
import { useGetCourses } from '#/features/courses/_hooks/courses/useGetCourses'
import { useGetMyCourses } from '#/features/courses/_hooks/courses/useGetMyCourses'
import { useCreateCheckoutSession, useEnrollFreeCourse } from '../_hooks/useCheckout'
import { handleCourseEnrollment } from '../_services/checkout.service'
import { CourseGridSkeleton } from '#/components/loading-skeleton'
import { EmptyState } from '#/components/empty-state'
import SearchBar from '#/components/search-bar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import { Button } from '#/components/ui/button'
import { usePaymentFilters } from '../_hooks/usePaymentFilters'
import type { Course } from '#/schemas'
import type { BuyCoursesSearchParams } from '#/lib/search'

import { PAGINATION } from '#/lib/constants'

// ─── BuyCoursesPageProps ───────────────────────────────────────────────────────

interface BuyCoursesPageProps {
  params?: { limit: number; page: number; search?: string }
  searchParams?: BuyCoursesSearchParams
}

// ─── BuyCoursesPage ────────────────────────────────────────────────────────────

export default function BuyCoursesPage({ params: _params, searchParams }: BuyCoursesPageProps = {}) {
  const { category, search, setFilter } = usePaymentFilters()

  const { data: allCoursesData, isLoading: isLoadingAll } = useGetCourses(
    { limit: PAGINATION.MAX_LIMIT, search: search || undefined },
  )
  const { data: enrolledCoursesData, isLoading: isLoadingMy } = useGetMyCourses({ limit: PAGINATION.MAX_LIMIT })


  const checkout = useCreateCheckoutSession()
  const enrollFree = useEnrollFreeCourse()

  const isLoading = isLoadingAll || isLoadingMy

  const enrolledIds = new Set((enrolledCoursesData?.data ?? []).map((c: Course) => c.id))

  const courses: Course[] = allCoursesData?.data ?? []

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = !category || course.category?.name === category
    return matchesCategory
  })

  const categories = Array.from(new Set(courses.map((c) => c.category?.name).filter(Boolean))) as string[]

  useEffect(() => {
    if (searchParams?.payment === 'failed') {
      toast.error('Payment was cancelled or failed. Please try again.')
    }
  }, [searchParams?.payment])

  return (
    <div className="flex-1 overflow-y-auto w-full bg-surface-bright/30">
      <div className="px-4 md:px-8 py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
        {/* Error/Warning Banner if Payment Failed */}
        {searchParams?.payment === 'failed' && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl p-4 flex items-center gap-3">
            <span className="flex-1 text-sm font-medium">
              Your payment session was cancelled or failed. Don't worry, you haven't been charged. You can try purchasing the course again.
            </span>
          </div>
        )}

        {/* Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary-container/40 p-6 md:p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-4 text-white">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-6 translate-x-6 scale-150">
            <ShoppingCart className="size-48" />
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold w-fit">
            <Sparkles className="size-3 text-yellow-300 fill-yellow-300" />
            <span>Elevate Your Learning Journey</span>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Browse &amp; Enroll in Premium Courses</h1>
            <p className="text-sm md:text-base text-white/90 max-w-xl">
              Gain access to high-quality curricula designed by professional educators. Invest in your skill set today!
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex flex-col md:flex-row gap-4 items-center shadow-sm">
          <div className="w-full md:w-1/3">
            <SearchBar placeholder="Search courses..." />
          </div>
          <div className="w-full md:w-auto flex flex-1 gap-4">
            <Select value={category || 'ALL'} onValueChange={(val) => setFilter('category', val === 'ALL' ? undefined : val)}>
              <SelectTrigger className="w-full md:w-48 bg-background border-outline-variant h-10">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <CourseGridSkeleton />
        ) : filteredCourses.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart className="size-12" />}
            title="No courses available"
            message="Check back later for newly published premium content."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-2">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={enrolledIds.has(course.id)}
                onBuy={() => handleCourseEnrollment(course.id, course.price, { checkout, enrollFree })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────────

interface CourseCardProps {
  course: Course
  isEnrolled: boolean
  onBuy: () => void
}

function CourseCard({ course, isEnrolled, onBuy }: CourseCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden flex flex-col shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300">
      <div className="h-44 w-full relative">
        <img
          src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-primary/95 text-white shadow-sm">
          {course.category?.name || 'General'}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-on-surface line-clamp-2">{course.title}</h3>
          <p className="text-xs text-on-surface-variant line-clamp-2">{course.description || 'No description provided.'}</p>
        </div>

        <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2">
          <span className="font-medium flex items-center gap-1">
            <Star className="size-3 text-yellow-500 fill-yellow-500" />
            4.8 rating
          </span>
          <span>12+ lessons</span>
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-outline-variant">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant">Price</span>
            <span className="text-lg font-extrabold text-primary">{course.price > 0 ? `${course.price} EGP` : 'Free'}</span>
          </div>

          {isEnrolled ? (
            <Button
              disabled
              variant="outline"
              className="flex items-center justify-center gap-2 bg-green-500/10 text-green-600 border-green-500/20 w-fit cursor-default hover:bg-green-500/10 hover:text-green-600"
            >
              <CheckCircle className="size-4" />
              Enrolled
            </Button>
          ) : (
            <Button
              onClick={onBuy}
              className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <ShoppingCart className="size-4" />
              {course.price > 0 ? 'Buy Now' : 'Enroll Free'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
