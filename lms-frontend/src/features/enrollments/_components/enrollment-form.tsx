import { useEnrollmentForm } from '../_hooks/useEnrollmentForm'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Label } from '#/components/ui/label'
import { Checkbox } from '#/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import type { Roles } from '#/schemas'

interface EnrollmentFormProps {
  onSuccess?: () => void
  role: Roles
}

export default function EnrollmentForm({ onSuccess, role }: EnrollmentFormProps) {
  const { form, students, courses, isLoadingStudents, isLoadingCourses, isPending, isFreeCourse, onSubmit } = useEnrollmentForm({ onSuccess, role })

  const {
    formState: { errors },
  } = form

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enroll Student</CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="flex flex-col gap-4 space-y-3">
          {!isFreeCourse && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="student-select">Student</Label>
              <Select
                value={form.watch('userId')}
                onValueChange={(val) => form.setValue('userId', val, { shouldValidate: true })}
                disabled={isLoadingStudents}
              >
                <SelectTrigger id="student-select" className="w-full">
                  <SelectValue placeholder={isLoadingStudents ? 'Loading students...' : 'Select a student'} />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student: any) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} ({student.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.userId && <span className="text-destructive text-xs">{errors.userId.message}</span>}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="course-select">Course</Label>
            <Select
              value={form.watch('courseId')}
              onValueChange={(val) => form.setValue('courseId', val, { shouldValidate: true })}
              disabled={isLoadingCourses}
            >
              <SelectTrigger id="course-select" className="w-full">
                <SelectValue placeholder={isLoadingCourses ? 'Loading courses...' : 'Select a course'} />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course: any) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.courseId && <span className="text-destructive text-xs">{errors.courseId.message}</span>}
          </div>

          <div className="flex items-center gap-2 p-2 ">
            <Checkbox id="free-course" checked={isFreeCourse} onCheckedChange={(checked) => form.setValue('isFreeCourse', checked === true)} />
            <Label htmlFor="free-course" className="cursor-pointer">
              Free Course
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Enrolling...' : 'Enroll Student'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
