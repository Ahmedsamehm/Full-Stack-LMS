import { useStudentDashboard } from '../../_hooks/use-student-dashboard'

import ContinueLearningCard from './continue-learning'
import MyCourses from './my-courses'
import RecommendedCourses from './recommended-courses'

export default function StudentDashboardPage() {
  const { data, isLoading } = useStudentDashboard()

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-6">
          Welcome back, Alex!
        </h2>
        <ContinueLearningCard
          course={data?.continueLearning}
          isLoading={isLoading}
        />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-on-surface">
              My Courses
            </h2>
            <a
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </a>
          </div>
          <MyCourses courses={data?.courses} isLoading={isLoading} />
        </section>

        <section className="xl:col-span-1">
          <h2 className="text-lg font-semibold text-on-surface mb-4">
            Recommended for You
          </h2>
          <RecommendedCourses
            courses={data?.recommended}
            isLoading={isLoading}
          />
        </section>
      </div>
    </main>
  )
}
