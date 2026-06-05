import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboards/student/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/protected/dashboards/student/"!</div>
}
