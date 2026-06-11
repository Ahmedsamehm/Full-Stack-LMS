import { Skeleton } from '#/components/ui/skeleton'

function CourseGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden"
        >
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
    <div className="flex-1 p-4 md:p-8 max-w-[1440px] mx-auto space-y-6">
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-8 w-3/4" />
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
        <div className="xl:col-span-4 space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-80 w-full" />
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

export { CourseGridSkeleton, CourseDetailSkeleton, SettingsFormSkeleton, SettingsTableSkeleton, NotificationListSkeleton }
