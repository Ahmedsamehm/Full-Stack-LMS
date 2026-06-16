import { FileText } from 'lucide-react'
import type { DashboardCourseDetail } from '#/schemas'

interface CourseResourcesProps {
  resources: DashboardCourseDetail['resources']
}

const fileIconMap: Record<
  string,
  { Icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  picture_as_pdf: { Icon: FileText, color: 'text-error' },
  description: { Icon: FileText, color: 'text-primary' },
  article: { Icon: FileText, color: 'text-outline' },
}

export function CourseResources({ resources }: CourseResourcesProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-low p-6">
      <h2 className="text-lg font-semibold text-on-surface mb-4">
        Course Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-secondary mb-3 uppercase tracking-wider">
              {section.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {section.resources.map((resource) => {
                const iconInfo = fileIconMap[resource.icon] || {
                  Icon: FileText,
                  color: 'text-on-surface-variant',
                }
                const IconComp = iconInfo.Icon
                return (
                  <li
                    key={resource.id}
                    className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
                  >
                    <IconComp className={`size-5 ${iconInfo.color}`} />
                    <span className="text-sm text-on-surface">
                      {resource.name}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
