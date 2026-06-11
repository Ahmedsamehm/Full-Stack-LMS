import { Button } from '#/components/ui/button'

import type { CourseMobileCtaProps } from '../../_types/courses.types'

export default function CourseMobileCta({ price }: CourseMobileCtaProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        <span className="text-xl font-bold text-foreground">${price}</span>
        <div className="space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Buy Now
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
