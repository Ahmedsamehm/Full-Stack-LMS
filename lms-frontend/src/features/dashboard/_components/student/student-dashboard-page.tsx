import SectionHeader from '#/components/section-header'
import { useStudentDashboard } from '../../_hooks/use-student-dashboard'

import ContinueLearningCard from './continue-learning'
import MyCourses from './my-courses'
import RecommendedCourses from './recommended-courses'

export default function StudentDashboardPage() {
  const { data, isLoading } = useStudentDashboard()

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
      <section>
        <SectionHeader title="Welcome back, Alex!" viewAll={false} />
        <ContinueLearningCard course={data?.continueLearning} isLoading={isLoading} />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2">
          <SectionHeader title="My Courses" viewAll viewAllLink="#" />
          <MyCourses courses={data?.courses} isLoading={isLoading} />
        </section>

        <section className="xl:col-span-1">
          <SectionHeader title="Recommended for You" viewAll={false} />
          <RecommendedCourses courses={data?.recommended} isLoading={isLoading} />
        </section>
      </div>
    </main>
  )
}
