import LandingHero from './landing-hero'
import PopularCourses from './popular-courses'
import AboutSection from './about-section'
import Header from '#/components/header'
import Footer from '#/components/footer'

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <LandingHero />
        <PopularCourses />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
