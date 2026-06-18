import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context, location }) => {
    // Skip auth check during SSR: on Vercel, server-side functions cannot
    // forward cross-domain HttpOnly cookies to the backend, so getUser()
    // always returns null on the server. The client-side will hydrate and
    // run this guard again with real cookies from the browser.
    if (typeof window === 'undefined') return

    if (!context.user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
