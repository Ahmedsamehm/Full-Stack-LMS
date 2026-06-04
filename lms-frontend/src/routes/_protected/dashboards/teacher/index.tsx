import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboards/teacher/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/protected/dashboards/teacher/"!</div>
}
