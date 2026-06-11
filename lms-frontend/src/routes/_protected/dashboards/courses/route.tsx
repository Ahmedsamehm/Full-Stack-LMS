import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboards/courses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
