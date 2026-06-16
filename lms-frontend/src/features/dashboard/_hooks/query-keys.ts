export const dashboardKeys = {
  all: ['dashboard'] as const,
  data: () => [...dashboardKeys.all, 'data'] as const,
  teacher: () => [...dashboardKeys.data(), 'teacher'] as const,
  admin: () => [...dashboardKeys.data(), 'admin'] as const,
}
