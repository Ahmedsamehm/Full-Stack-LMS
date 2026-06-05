export interface LandingInstructor {
  name: string
  initials: string
  rating: number
  reviewCount: number
}

export interface LandingCourse {
  id: string
  slug: string
  category: string
  title: string
  description: string
  price: number
  originalPrice?: number
  instructor: LandingInstructor
}

export interface HeroContent {
  title: string
  subtitle: string
  ctaPrimary: { label: string }
  ctaSecondary: { label: string }
}

export interface AboutCopy {
  title: string
  description: string
  features: string[]
}

export interface FooterLink {
  label: string
  href: string
}
