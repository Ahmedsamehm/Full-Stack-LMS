import type { DashboardCourseDetail } from '../_types/dashboard-course-detail.types'

export const dashboardCourseDetail: DashboardCourseDetail = {
  id: '1',
  title: 'Advanced Machine Learning',
  code: 'CS-402',
  semester: 'Spring 2024',
  credits: 4,
  category: 'Computer Science',
  description:
    'This course provides a deep dive into advanced machine learning algorithms, focusing on deep neural networks, natural language processing, and reinforcement learning. Students will implement complex models using PyTorch and TensorFlow, applying them to real-world datasets. Prerequisites include linear algebra, calculus, and introductory Python programming.',
  thumbnail:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC7vepW_pFHzWfLW2MUzBkuH6lrJ_pL8T3JxCEVuUr9W7SemsKeoKop8tr3rqoARc2UO0w5mWmcHJEjcPQNU4Jigbn2VemX3D_M71D7xwp8xYjwmFQMm8EiIRFzNV6j5prb_zhRAR7Utjj3q0PdD6Ke7ylZ6Tzs8pxFon26zBfn27OtAckZCzRAjLi16XThD3lPIQ13cuk8DzKIzJq6zNYQoYyQHzbpzUb2EdcRSkDpWoFJQYlQoiNjWvTQlcqLNsY2jEOIscBhezNG',
  instructor: {
    name: 'Dr. Elena Rodriguez',
    title: 'Lead Instructor • Dept. of Computer Science',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHmUPlMB51f3NkNI7kY7siul-ghQcHqSUCAUyM5RnarDK53faXIgzB2-QkMZWQ5yNowxlbF7r6Z2IxsKrzQA0Hc0hRS5tSJKroHdJo3NQJQ5IySpKYpmhSR3wHPlK882cOGZIL34dOkZkIuIoBDn2sUh75CoagIG9ARlL7AWlVm0hRYt-_0oWtRE3SduC4FxHDQSR4c0qXsRO9XGPPdGzgUKDW0angJbyHXYU1NxBD5lMXEOVgPvZIpmvASNd5BIQ3M9s6YFigisRk',
  },
  stats: {
    enrolledStudents: 142,
    avgCompletion: 78,
  },
  modules: [
    {
      id: 'm1',
      title: 'Foundations of Deep Learning',
      subtitle: '4 Lessons • 2h 15m',
      isExpanded: false,
      lessons: [
        { id: 'm1-l1', title: 'Introduction to Neural Networks', duration: '45m', type: 'video' },
        { id: 'm1-l2', title: 'Backpropagation & Gradient Descent', duration: '30m', type: 'video' },
        { id: 'm1-l3', title: 'Activation Functions', duration: '25m', type: 'video' },
        { id: 'm1-l4', title: 'Lab: Building a Perceptron', duration: '35m', type: 'assignment' },
      ],
    },
    {
      id: 'm2',
      title: 'Convolutional Neural Networks',
      subtitle: '5 Lessons • 1 Assignment • 3h 45m',
      isExpanded: true,
      lessons: [
        { id: 'm2-l1', title: 'Architecture of CNNs', duration: '45m', type: 'video' },
        { id: 'm2-l2', title: 'Pooling and Padding', duration: '30m', type: 'video' },
        { id: 'm2-l3', title: 'Transfer Learning', duration: '40m', type: 'video' },
        { id: 'm2-l4', title: 'Advanced CNN Architectures', duration: '50m', type: 'video' },
        { id: 'm2-l5', title: 'Lab: Build an Image Classifier', duration: '0m', type: 'assignment', dueDate: 'Oct 15' },
      ],
    },
    {
      id: 'm3',
      title: 'Sequence Models & NLP',
      subtitle: '6 Lessons • 4h 20m',
      isExpanded: false,
      lessons: [
        { id: 'm3-l1', title: 'RNNs and LSTMs', duration: '50m', type: 'video' },
        { id: 'm3-l2', title: 'Attention Mechanisms', duration: '45m', type: 'video' },
        { id: 'm3-l3', title: 'Transformers & BERT', duration: '55m', type: 'video' },
        { id: 'm3-l4', title: 'Sequence-to-Sequence Models', duration: '40m', type: 'video' },
        { id: 'm3-l5', title: 'Sentiment Analysis Lab', duration: '30m', type: 'assignment' },
        { id: 'm3-l6', title: 'Final Project Kickoff', duration: '40m', type: 'assignment' },
      ],
    },
  ],
  resources: [
    {
      title: 'PDF Resources',
      resources: [
        { id: 'r1', name: 'Lecture Slides.pdf', type: 'pdf', icon: 'picture_as_pdf', iconColor: 'text-error' },
        { id: 'r2', name: 'Lab Manual.pdf', type: 'pdf', icon: 'picture_as_pdf', iconColor: 'text-error' },
      ],
    },
    {
      title: 'Study Notes',
      resources: [
        { id: 'r3', name: 'Week 1 Summary.docx', type: 'doc', icon: 'description', iconColor: 'text-primary' },
        { id: 'r4', name: 'Reading List.txt', type: 'text', icon: 'article', iconColor: 'text-outline' },
      ],
    },
  ],
  activities: [
    {
      id: 'a1',
      name: 'Alex Johnson',
      initials: 'AJ',
      action: 'Submitted Assignment M2',
      timestamp: '2h ago',
    },
    {
      id: 'a2',
      name: 'Marcus Chen',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDL16aQ1TvFj_sWkqJASAdGBN7BVaF9QY4TBeYie2RaIZbZMZNIBQjQBKFt8RIKKlQh51GXeOauyBx39xDsBifObc2z6eWcagUvEqotepGzbmPT_9ar-otcpMhs6UnPupa4fbsOq3tQi5bYfWA-ya4T9SpQ-pTLCYb489U_yRjKjvz5-89Sv84bfm4iEgL9lW3EiyUqXzY2GpDGyrsXyPc08vfZsZWsKXVf-bjJjJxxXl0EjofhCZaSFuCjtSzP7QQEBHX4ln4wMz7q',
      action: 'Completed Module 1',
      timestamp: '5h ago',
    },
    {
      id: 'a3',
      name: 'Sarah Williams',
      initials: 'SW',
      avatarBg: 'bg-error-container',
      avatarColor: 'text-on-error-container',
      action: 'Missed Deadline M1',
      timestamp: '1d ago',
    },
  ],
}

export const dashboardCourseDetails: Record<string, DashboardCourseDetail> = {
  '1': dashboardCourseDetail,
  '2': {
    ...dashboardCourseDetail,
    id: '2',
    title: 'Full-Stack Web Development Bootcamp',
    code: 'CS-305',
    semester: 'Spring 2024',
    credits: 3,
    category: 'Technology',
    description:
      'A comprehensive bootcamp covering modern full-stack development with React, Node.js, TypeScript, and databases.',
    instructor: {
      name: 'Prof. Marcus Cole',
      title: 'Lead Instructor • Dept. of Computer Science',
      avatar: dashboardCourseDetail.instructor.avatar,
    },
    stats: { enrolledStudents: 320, avgCompletion: 65 },
  },
  '3': {
    ...dashboardCourseDetail,
    id: '3',
    title: 'Conversational Spanish for Business',
    code: 'SPA-201',
    semester: 'Spring 2024',
    credits: 3,
    category: 'Languages',
    description:
      'Learn practical Spanish conversation skills tailored for business environments, including meetings, negotiations, and presentations.',
    instructor: {
      name: 'Elena Rodriguez',
      title: 'Senior Instructor • Dept. of Modern Languages',
      avatar: dashboardCourseDetail.instructor.avatar,
    },
    stats: { enrolledStudents: 85, avgCompletion: 88 },
  },
  '4': {
    ...dashboardCourseDetail,
    id: '4',
    title: 'Introduction to Machine Learning',
    code: 'CS-401',
    semester: 'Spring 2024',
    credits: 4,
    category: 'Technology',
    description:
      'An introductory course covering fundamental machine learning concepts, algorithms, and practical implementations.',
    instructor: {
      name: 'Dr. Alan Turing',
      title: 'Professor • Dept. of Computer Science',
      avatar: dashboardCourseDetail.instructor.avatar,
    },
    stats: { enrolledStudents: 520, avgCompletion: 72 },
  },
  '5': {
    ...dashboardCourseDetail,
    id: '5',
    title: 'Digital Marketing Strategy',
    code: 'BUS-310',
    semester: 'Spring 2024',
    credits: 3,
    category: 'Business',
    description:
      'Master modern digital marketing strategies including SEO, content marketing, social media, and analytics.',
    instructor: {
      name: 'Priya Sharma',
      title: 'Professor of Marketing • School of Business',
      avatar: dashboardCourseDetail.instructor.avatar,
    },
    stats: { enrolledStudents: 210, avgCompletion: 80 },
  },
}
