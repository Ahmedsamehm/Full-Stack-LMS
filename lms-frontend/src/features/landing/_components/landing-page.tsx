import LandingHeader from './landing-header'
import LandingHero from './landing-hero'
import PopularCourses from './popular-courses'
import AboutSection from './about-section'
import LandingFooter from './landing-footer'

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main>
        <LandingHero />
        <PopularCourses />
        <AboutSection />
      </main>
      <LandingFooter />
    </>
  )
}
