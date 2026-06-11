import type {
  CourseListItem,
  CategoryOption,
  CourseDetail,
} from '../_types/courses.types'

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
  {
    id: '4',
    slug: 'typescript-mastery',
    category: 'Development',
    title: 'TypeScript Mastery',
    description:
      'Go from intermediate to expert with advanced generics, conditional types, mapped types, and real-world TypeScript patterns.',
    price: 89,
    instructor: {
      name: 'Emily Park',
      initials: 'EP',
      rating: 4.7,
      reviewCount: 84,
    },
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
    instructor: {
      name: 'James Liu',
      initials: 'JL',
      rating: 4.8,
      reviewCount: 72,
    },
  },
  {
    id: '6',
    slug: 'python-for-data',
    category: 'Data Science',
    title: 'Python for Data Analysis',
    description:
      'Harness Pandas, NumPy, and Matplotlib to clean, transform, and visualize data. Perfect for aspiring data analysts.',
    price: 109,
    instructor: {
      name: 'Anna Kowalski',
      initials: 'AK',
      rating: 4.6,
      reviewCount: 210,
    },
  },
  {
    id: '7',
    slug: 'entrepreneurship-101',
    category: 'Business',
    title: 'Entrepreneurship 101',
    description:
      'Turn your idea into a viable business. Learn lean methodology, customer discovery, fundraising, and go-to-market strategy.',
    price: 49,
    instructor: {
      name: 'Robert Mendez',
      initials: 'RM',
      rating: 4.5,
      reviewCount: 65,
    },
  },
  {
    id: '8',
    slug: 'digital-marketing-strategy',
    category: 'Marketing',
    title: 'Digital Marketing Strategy',
    description:
      'Master SEO, SEM, social media marketing, content strategy, and analytics to drive growth for any brand.',
    price: 59,
    instructor: {
      name: 'Priya Sharma',
      initials: 'PS',
      rating: 4.7,
      reviewCount: 93,
    },
  },
  {
    id: '9',
    slug: 'photography-masterclass',
    category: 'Photography',
    title: 'Photography Masterclass',
    description:
      'Learn composition, lighting, editing, and storytelling. From smartphone to DSLR, capture stunning images in any setting.',
    price: 39,
    instructor: {
      name: 'Alex Turner',
      initials: 'AT',
      rating: 4.8,
      reviewCount: 142,
    },
  },
  {
    id: '10',
    slug: 'react-testing-jest',
    category: 'Development',
    title: 'React Testing with Jest & RTL',
    description:
      'Learn to write robust tests for React components using Jest and React Testing Library. Cover unit, integration, and E2E testing strategies.',
    price: 79,
    instructor: { name: 'David Chen', initials: 'DC', rating: 4.9, reviewCount: 120 },
  },
  {
    id: '11',
    slug: 'nextjs-fullstack',
    category: 'Development',
    title: 'Next.js Full-Stack Development',
    description:
      'Build production-ready full-stack applications with Next.js, including SSR, ISR, API routes, authentication, and database integration.',
    price: 109,
    originalPrice: 149,
    instructor: { name: 'David Chen', initials: 'DC', rating: 4.9, reviewCount: 120 },
  },
]

export const courseDetails: CourseDetail[] = [
  {
    id: '1',
    slug: 'advanced-react-patterns',
    category: 'Development',
    title: 'Advanced React Patterns',
    description:
      'Master complex UI state management with compound components, render props, and the latest React Server Components pattern. This comprehensive course takes you from intermediate React knowledge to advanced production-ready patterns used by top engineering teams.',
    price: 99,
    instructor: {
      name: 'David Chen',
      initials: 'DC',
      rating: 4.9,
      reviewCount: 120,
    },
    totalDuration: 18.5,
    totalLessons: 6,
    stats: { enrollments: 3421 },
    objectives: [
      'Build reusable component patterns with composition',
      'Implement compound components for flexible APIs',
      'Master render props and higher-order components',
      'Leverage React Server Components in production',
      'Optimize performance with advanced memoization',
      'Design scalable state management architectures',
    ],
    lessons: [
      {
        id: 'l1',
        title: 'Introduction to Advanced Patterns',
        duration: 45,
        orderIndex: 1,
        description:
          'Overview of the React ecosystem evolution, why advanced patterns matter, and a roadmap of what you will build throughout the course.',
        pdfUrl: '/pdfs/react-patterns-ch1.pdf',
      },
      {
        id: 'l2',
        title: 'Compound Components',
        duration: 52,
        orderIndex: 2,
        description:
          'Deep dive into compound component pattern. Build a reusable accordion, tab switcher, and dropdown using Context API and React children utilities.',
        pdfUrl: '/pdfs/react-patterns-ch2.pdf',
      },
      {
        id: 'l3',
        title: 'Render Props & HOCs',
        duration: 48,
        orderIndex: 3,
        description:
          'Understand render props and higher-order components. Compare their trade-offs and learn when to use each pattern for cross-cutting concerns.',
        pdfUrl: '/pdfs/react-patterns-ch3.pdf',
      },
      {
        id: 'l4',
        title: 'React Server Components',
        duration: 55,
        orderIndex: 4,
        description:
          'Explore React Server Components, how they differ from client components, and build a hybrid rendering architecture for optimal performance.',
      },
      {
        id: 'l5',
        title: 'Performance Optimization',
        duration: 42,
        orderIndex: 5,
        description:
          'Master useMemo, useCallback, React.memo, and profiling tools. Identify and fix performance bottlenecks in complex React trees.',
        pdfUrl: '/pdfs/react-patterns-ch5.pdf',
      },
      {
        id: 'l6',
        title: 'State Management Architecture',
        duration: 50,
        orderIndex: 6,
        description:
          'Design a scalable state management layer combining Context, useReducer, and external libraries. Build a real-world shopping cart and auth flow.',
      },
    ],
    teacherBio:
      'David is a senior frontend engineer with 10+ years of experience building web applications at scale. He has worked at多家硅谷 companies and is a core contributor to several open-source React libraries. He is passionate about teaching developers to write maintainable, performant React code.',
    teacherInitials: 'DC',
  },
  {
    id: '2',
    slug: 'ui-ux-fundamentals',
    category: 'Design',
    title: 'UI/UX Fundamentals',
    description:
      'Learn the principles of user-centered design, from wireframing and prototyping to usability testing and design systems. Build a portfolio-ready project from scratch.',
    price: 79,
    originalPrice: 129,
    instructor: {
      name: 'Sarah Jenkins',
      initials: 'SJ',
      rating: 4.8,
      reviewCount: 98,
    },
    totalDuration: 14,
    totalLessons: 5,
    stats: { enrollments: 2856 },
    objectives: [
      'Understand user-centered design methodology',
      'Create wireframes and interactive prototypes',
      'Conduct usability testing sessions',
      'Build and maintain a design system',
      'Master color theory and typography',
    ],
    lessons: [
      {
        id: 'l1',
        title: 'Design Thinking Fundamentals',
        duration: 40,
        orderIndex: 1,
        description:
          'Introduction to the design thinking process: empathize, define, ideate, prototype, and test. Understand how to apply this framework to real projects.',
      },
      {
        id: 'l2',
        title: 'Wireframing & Prototyping',
        duration: 55,
        orderIndex: 2,
        description:
          'Learn to create low-fidelity wireframes and high-fidelity prototypes using Figma. Cover layout grids, component libraries, and interactive flows.',
        pdfUrl: '/pdfs/uiux-ch2.pdf',
      },
      {
        id: 'l3',
        title: 'Visual Design Principles',
        duration: 48,
        orderIndex: 3,
        description:
          'Deep dive into color theory, typography, spacing, and visual hierarchy. Learn how to create aesthetically pleasing and functional interfaces.',
      },
      {
        id: 'l4',
        title: 'Usability Testing',
        duration: 35,
        orderIndex: 4,
        description:
          'Plan and conduct usability tests, analyze results, and iterate on designs based on user feedback. Learn tools and best practices for remote testing.',
        pdfUrl: '/pdfs/uiux-ch4.pdf',
      },
      {
        id: 'l5',
        title: 'Design Systems & Handoff',
        duration: 42,
        orderIndex: 5,
        description:
          'Build a scalable design system with tokens, components, and documentation. Learn effective developer handoff workflows and tools.',
      },
    ],
    teacherBio:
      'Sarah is a product designer with 8 years of experience at agencies and startups. She has shipped products for Fortune 500 companies and early-stage startups alike. She specializes in design systems and user research.',
    teacherInitials: 'SJ',
  },
  {
    id: '3',
    slug: 'data-science-ml',
    category: 'Data Science',
    title: 'Data Science & Machine Learning',
    description:
      'Dive into Python, statistical modeling, and machine learning algorithms. Build predictive models with real-world datasets. From data cleaning to deploying ML models.',
    price: 119,
    instructor: {
      name: 'Michael Torres',
      initials: 'MT',
      rating: 4.9,
      reviewCount: 156,
    },
    totalDuration: 22,
    totalLessons: 7,
    stats: { enrollments: 5120 },
    objectives: [
      'Clean and preprocess real-world datasets',
      'Build regression and classification models',
      'Implement neural networks with TensorFlow',
      'Deploy ML models to production',
      'Master feature engineering techniques',
      'Understand model evaluation and tuning',
    ],
    lessons: [
      {
        id: 'l1',
        title: 'Python for Data Science',
        duration: 50,
        orderIndex: 1,
        description:
          'Review essential Python libraries: NumPy, Pandas, and Matplotlib. Learn data loading, cleaning, and exploratory data analysis techniques.',
        pdfUrl: '/pdfs/ds-ch1.pdf',
      },
      {
        id: 'l2',
        title: 'Statistical Foundations',
        duration: 55,
        orderIndex: 2,
        description:
          'Cover probability distributions, hypothesis testing, correlation analysis, and Bayesian thinking. Build intuition for statistical modeling.',
      },
      {
        id: 'l3',
        title: 'Supervised Learning',
        duration: 60,
        orderIndex: 3,
        description:
          'Implement linear regression, logistic regression, decision trees, and random forests. Understand bias-variance tradeoff and cross-validation.',
        pdfUrl: '/pdfs/ds-ch3.pdf',
      },
      {
        id: 'l4',
        title: 'Unsupervised Learning',
        duration: 45,
        orderIndex: 4,
        description:
          'Explore clustering algorithms (K-Means, DBSCAN), dimensionality reduction (PCA, t-SNE), and anomaly detection techniques.',
      },
      {
        id: 'l5',
        title: 'Neural Networks & Deep Learning',
        duration: 65,
        orderIndex: 5,
        description:
          'Build neural networks from scratch and with TensorFlow/Keras. Cover CNNs for image data and RNNs for sequential data.',
        pdfUrl: '/pdfs/ds-ch5.pdf',
      },
      {
        id: 'l6',
        title: 'Model Evaluation & Tuning',
        duration: 40,
        orderIndex: 6,
        description:
          'Learn metrics for classification and regression, hyperparameter tuning with GridSearch and RandomSearch, and avoid overfitting.',
      },
      {
        id: 'l7',
        title: 'Model Deployment',
        duration: 50,
        orderIndex: 7,
        description:
          'Deploy ML models as REST APIs with FastAPI, containerize with Docker, and monitor model performance in production.',
        pdfUrl: '/pdfs/ds-ch7.pdf',
      },
    ],
    teacherBio:
      'Michael is a machine learning engineer with a PhD in Computer Science. He has worked at leading AI labs and built production ML systems serving millions of users. He is passionate about making data science accessible to everyone.',
    teacherInitials: 'MT',
  },
]
