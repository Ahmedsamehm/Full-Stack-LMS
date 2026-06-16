import { Skeleton } from '#/components/ui/skeleton'

function CourseGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
          <Skeleton className="h-40 w-full" />
          <div className="p-6 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="pt-4 border-t border-outline-variant">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function CourseDetailSkeleton() {
  return (
    <div className="flex-1 p-4 md:p-8 w-full max-w-[1440px] mx-auto space-y-6 overflow-hidden">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>

      {/* Bento Grid Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-8 space-y-6">
          {/* About Card Skeleton */}
          <div className="bg-surface-container-lowest rounded-xl shadow-low p-6 space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-outline-variant">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>

          {/* Resources Card Skeleton */}
          <div className="bg-surface-container-lowest rounded-xl shadow-low p-6 space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex items-center gap-3 p-2">
                        <Skeleton className="size-5 rounded" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus Card Skeleton */}
          <div className="bg-surface-container-lowest rounded-xl shadow-low p-6 space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24 rounded animate-pulse" />
                <Skeleton className="h-8 w-20 rounded animate-pulse" />
              </div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-outline-variant rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-8 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 space-y-6">
          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest rounded-xl shadow-low p-4 flex flex-col items-center space-y-2">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="bg-surface-container-lowest rounded-xl shadow-low p-4 flex flex-col items-center space-y-2">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>

          {/* Recent Activity Card Skeleton */}
          <div className="bg-surface-container-lowest rounded-xl shadow-low flex flex-col min-h-[400px]">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="size-8 rounded-full" />
            </div>
            <div className="flex-1 p-4 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-3 w-12" />
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-outline-variant">
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsFormSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="p-6 md:p-8 border-b border-outline-variant bg-surface-bright">
        <Skeleton className="h-6 w-40 mb-1" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full md:col-span-2" />
          <Skeleton className="h-32 w-full md:col-span-2" />
        </div>
      </div>
      <div className="p-6 border-t border-outline-variant bg-surface-container-low">
        <Skeleton className="h-10 w-32 ml-auto" />
      </div>
    </div>
  )
}

function SettingsTableSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="p-6 md:p-8 border-b border-outline-variant bg-surface-bright">
        <Skeleton className="h-6 w-36 mb-1" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="p-6 md:p-8 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    </div>
  )
}

function NotificationListSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-6 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
      {/* ── Page heading ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>

      {/* ── Bottom grid (2/3 + 1/3) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main panel */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col gap-4">
          <Skeleton className="h-5 w-40" />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full shrink-0" />
            </div>
          ))}
        </div>

        {/* Side panel */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col gap-4">
          <Skeleton className="h-5 w-32" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

function TableSkeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden ${className || ''}`}>
      <div className="p-6 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
      <Skeleton className="h-5 w-40 mb-4" />
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  )
}

function StatsCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className={`grid grid-cols-1 ${count === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  )
}

function ListSkeleton({ count = 3, hasHeader = true, className }: { count?: number; hasHeader?: boolean; className?: string }) {
  return (
    <div className={`bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 ${className || ''}`}>
      {hasHeader && (
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-6 rounded-full" />
        </div>
      )}
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="size-10 rounded-full shrink-0" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgressCardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="size-12 rounded-lg shrink-0" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-1.5 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

function ContinueLearningSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col md:flex-row">
      <Skeleton className="md:w-[40%] h-48 md:h-auto shrink-0" />
      <div className="p-6 flex-1 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}

function RecommendedCoursesSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
        <Skeleton className="h-32 w-full" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 flex gap-4">
        <Skeleton className="size-16 rounded-lg shrink-0" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    </div>
  )
}

export {
  CourseGridSkeleton,
  CourseDetailSkeleton,
  SettingsFormSkeleton,
  SettingsTableSkeleton,
  NotificationListSkeleton,
  DashboardSkeleton,
  TableSkeleton,
  CardSkeleton,
  StatsCardsSkeleton,
  ListSkeleton,
  ProgressCardsSkeleton,
  ContinueLearningSkeleton,
  RecommendedCoursesSkeleton,
}
