import FeatureItem from './feature-item'

import { aboutCopy } from '../_data/landing.mock'

export default function AboutSection() {
  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-5/12">
            <img src="/aboutus.webp" />
          </div>

          <div className="flex-1 space-y-6">
            <h2
              id="about-heading"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground"
            >
              {aboutCopy.title}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              {aboutCopy.description}
            </p>
            <div className="space-y-4 pt-2">
              {aboutCopy.features.map((feature, index) => (
                <FeatureItem key={index} text={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
