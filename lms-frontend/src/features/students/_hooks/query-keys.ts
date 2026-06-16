export const studentKeys = {
  all: ['student'] as const,
  detail: (id: string) => [...studentKeys.all, id] as const,
  teacherStudentsAll: ['my-students'] as const,
  teacherStudentsList: (params: any) => [...studentKeys.teacherStudentsAll, params] as const,
}
