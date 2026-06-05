import type { CourseListItem, CategoryOption } from '../_types/courses.types'

export const categories: CategoryOption[] = [
  { slug: 'all', name: 'All' },
  { slug: 'development', name: 'Development' },
  { slug: 'design', name: 'Design' },
  { slug: 'data-science', name: 'Data Science' },
  { slug: 'business', name: 'Business' },
  { slug: 'marketing', name: 'Marketing' },
  { slug: 'photography', name: 'Photography' },
]

export const courses: CourseListItem[] = [
  {
    id: '1',
    slug: 'advanced-react-patterns',
    category: 'Development',
    title: 'Advanced React Patterns',
    description:
      'Master complex UI state management with compound components, render props, and the latest React Server Components pattern.',
    price: 99,
    instructor: { name: 'David Chen', initials: 'DC', rating: 4.9, reviewCount: 120 },
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
    instructor: { name: 'Sarah Jenkins', initials: 'SJ', rating: 4.8, reviewCount: 98 },
  },
  {
    id: '3',
    slug: 'data-science-ml',
    category: 'Data Science',
    title: 'Data Science & Machine Learning',
    description:
      'Dive into Python, statistical modeling, and machine learning algorithms. Build predictive models with real-world datasets.',
    price: 119,
    instructor: { name: 'Michael Torres', initials: 'MT', rating: 4.9, reviewCount: 156 },
  },
  {
    id: '4',
    slug: 'typescript-mastery',
    category: 'Development',
    title: 'TypeScript Mastery',
    description:
      'Go from intermediate to expert with advanced generics, conditional types, mapped types, and real-world TypeScript patterns.',
    price: 89,
    instructor: { name: 'Emily Park', initials: 'EP', rating: 4.7, reviewCount: 84 },
  },
  {
    id: '5',
    slug: 'figma-design-system',
    category: 'Design',
    title: 'Figma Design Systems',
    description:
      'Build scalable design systems in Figma. Cover tokens, components, variants, auto layout, and team collaboration workflows.',
    price: 69,
    originalPrice: 99,
    instructor: { name: 'James Liu', initials: 'JL', rating: 4.8, reviewCount: 72 },
  },
  {
    id: '6',
    slug: 'python-for-data',
    category: 'Data Science',
    title: 'Python for Data Analysis',
    description:
      'Harness Pandas, NumPy, and Matplotlib to clean, transform, and visualize data. Perfect for aspiring data analysts.',
    price: 109,
    instructor: { name: 'Anna Kowalski', initials: 'AK', rating: 4.6, reviewCount: 210 },
  },
  {
    id: '7',
    slug: 'entrepreneurship-101',
    category: 'Business',
    title: 'Entrepreneurship 101',
    description:
      'Turn your idea into a viable business. Learn lean methodology, customer discovery, fundraising, and go-to-market strategy.',
    price: 49,
    instructor: { name: 'Robert Mendez', initials: 'RM', rating: 4.5, reviewCount: 65 },
  },
  {
    id: '8',
    slug: 'digital-marketing-strategy',
    category: 'Marketing',
    title: 'Digital Marketing Strategy',
    description:
      'Master SEO, SEM, social media marketing, content strategy, and analytics to drive growth for any brand.',
    price: 59,
    instructor: { name: 'Priya Sharma', initials: 'PS', rating: 4.7, reviewCount: 93 },
  },
  {
    id: '9',
    slug: 'photography-masterclass',
    category: 'Photography',
    title: 'Photography Masterclass',
    description:
      'Learn composition, lighting, editing, and storytelling. From smartphone to DSLR, capture stunning images in any setting.',
    price: 39,
    instructor: { name: 'Alex Turner', initials: 'AT', rating: 4.8, reviewCount: 142 },
  },
]
