import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'

import { heroContent } from '../_data/landing.mock'

export default function LandingHero() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 min-h-dvh flex items-center justify-center">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full">
          <div className="flex-1 text-center lg:text-left space-y-6 lg:max-w-none w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.1] tracking-tight text-foreground w-full">
              {heroContent.title}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground w-full">
              {heroContent.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2 ">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base px-8 text-white"
              >
                {heroContent.ctaPrimary.label}
              </Button>
              <Link to="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base px-8"
                >
                  {heroContent.ctaSecondary.label}
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full hidden lg:block">
            <img
              src="Auth/screen3.webp"
              alt="Landing Hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
