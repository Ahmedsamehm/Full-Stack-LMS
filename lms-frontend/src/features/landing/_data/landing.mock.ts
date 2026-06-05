import type {
  LandingCourse,
  HeroContent,
  AboutCopy,
  FooterLink,
} from '../_types/landing.types'

export const heroContent: HeroContent = {
  title: 'Learn. Teach. Grow.',
  subtitle:
    'A modern platform for structured online education that connects passionate teachers with eager learners worldwide.',
  ctaPrimary: { label: 'Start Learning' },
  ctaSecondary: { label: 'Browse Courses' },
}

export const courses: LandingCourse[] = [
  {
    id: '1',
    slug: 'advanced-react-patterns',
    category: 'Development',
    title: 'Advanced React Patterns',
    description:
      'Master complex UI state management with compound components, render props, and the latest React Server Components pattern.',
    price: 99,
    instructor: {
      name: 'David Chen',
      initials: 'DC',
      rating: 4.9,
      reviewCount: 120,
    },
  },
  {
    id: '2',
    slug: 'ui-ux-fundamentals',
    category: 'Design',
    title: 'UI/UX Fundamentals',
    description:
      'Learn the principles of user-centered design, from wireframing and prototyping to usability testing and design systems.',
    price: 79,
    originalPrice: 129,
    instructor: {
      name: 'Sarah Jenkins',
      initials: 'SJ',
      rating: 4.8,
      reviewCount: 98,
    },
  },
  {
    id: '3',
    slug: 'data-science-ml',
    category: 'Data Science',
    title: 'Data Science & Machine Learning',
    description:
      'Dive into Python, statistical modeling, and machine learning algorithms. Build predictive models with real-world datasets.',
    price: 119,
    instructor: {
      name: 'Michael Torres',
      initials: 'MT',
      rating: 4.9,
      reviewCount: 156,
    },
  },
]

export const aboutCopy: AboutCopy = {
  title: 'About Us',
  description:
    'We built EduPro to bridge the gap between traditional education and modern digital learning. Our platform empowers educators to create engaging courses while providing students with a seamless, personalized learning experience.',
  features: [
    'Seamless connection between students and teachers through interactive tools.',
    'Built-in tools for assessments, scheduling, and comprehensive analytics.',
    'Global reach with localized content delivery and multi-language support.',
  ],
}

export const footerLinks: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Help Center', href: '/help' },
  { label: 'Contact Sales', href: '/contact' },
]
