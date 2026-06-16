import { Button } from '#/components/ui/button'

interface CourseMobileCtaProps {
  price: number
}

export default function CourseMobileCta({ price }: CourseMobileCtaProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        <span className="text-xl font-bold text-foreground">${price}</span>
        <div className="space-x-3">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Buy Now
          </Button>
          <Button variant="outline">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
