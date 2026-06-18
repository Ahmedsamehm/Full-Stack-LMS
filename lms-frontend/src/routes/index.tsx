import { createFileRoute } from '@tanstack/react-router'
import { getUser } from '#/features/users/_api/users'
import Header from '#/components/Header'
import LandingHero from '#/features/landing/_components/landing-hero'
import PopularCourses from '#/features/landing/_components/popular-courses'
import AboutSection from '#/features/landing/_components/about-section'
import Footer from '#/components/Footer'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: `EduPro - Home`,
        description: `Welcome to EduPro`,
      },
    ],
  }),
  component: landingPage,
})

function landingPage() {
  const { user } = Route.useRouteContext()
  return (
    <>
      <Header user={user} />
      <main>
        <LandingHero />
        <PopularCourses />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
