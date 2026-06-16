import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard/courses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
