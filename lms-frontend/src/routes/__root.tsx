import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import TanStackQueryDevtools from '../lib/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { getUser } from '#/features/users/_api/users'
import { userKeys } from '#/features/users/_hooks/query-keys'

interface MyRouterContext {
  queryClient: QueryClient
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context: { queryClient } }) => {
    // Skip during SSR — cookies can't cross domains on Vercel serverless
    if (typeof window === 'undefined') {
      return { user: null }
    }
    try {
      // ensureQueryData: uses TanStack Query cache.
      // If data is fresh (< 5 min old), returns cached value — NO network call.
      // Only fetches from backend when cache is empty or stale.
      const user = await queryClient.ensureQueryData({
        queryKey: userKeys.self(),
        queryFn: () => getUser(),
        staleTime: 1000 * 60 * 5, // 5 minutes
      })
      return { user }
    } catch {
      return { user: null }
    }
  },

  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased  animate-in fade-in duration-300  min-h-dvh scroll-smooth  ">
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
