import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboards/admins/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/protected/dashboards/admins/"!</div>
}
