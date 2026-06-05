import Footer from '#/components/footer'
import Header from '#/components/header'
import { createFileRoute } from '@tanstack/react-router'

import CoursesPage from '#/features/courses/_components/courses-page'

export const Route = createFileRoute('/_public/_courses/courses')({
  head: () => ({
    meta: [
      {
        title: 'EduPro - Courses',
        description: 'Browse our courses',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />
      <CoursesPage />
      <Footer />
    </>
  )
}
