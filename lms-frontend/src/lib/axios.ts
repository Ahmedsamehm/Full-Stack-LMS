import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { createIsomorphicFn } from '@tanstack/react-start'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Sends cookies automatically in the browser
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// SSR Cookie Forwarding:Dynamic Import Build
// ─────────────────────────────────────────────────────────────────────────────
const getForwardedHeaders = createIsomorphicFn()
  .server(async (): Promise<{ Cookie?: string }> => {
    try {
      const { getRequest } = await import('@tanstack/react-start/server')
      const request = getRequest()
      const cookieHeader = request?.headers.get('cookie') ?? ''
      if (cookieHeader) {
        return { Cookie: cookieHeader }
      }
    } catch (e) {
      console.warn('SSR: Could not get request headers to forward cookies.')
    }
    return {}
  })

  .client((): { Cookie?: string } => ({}))

// ─────────────────────────────────────────────────────────────────────────────
// REQUEST INTERCEPTOR: Handles SSR Base URL and SSR Cookie forwarding
// ─────────────────────────────────────────────────────────────────────────────
api.interceptors.request.use(async (config) => {
  // CLIENT SIDE: Browser automatically attaches HttpOnly cookies. Do nothing.
  if (typeof window !== 'undefined') {
    return config
  }
  // 2. Extract cookies from the incoming browser request and forward them
  const forwardedHeaders = await getForwardedHeaders()
  if (forwardedHeaders.Cookie) {
    config.headers.Cookie = forwardedHeaders.Cookie
  }

  return config
})

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSE INTERCEPTOR: Handles Errors, Refresh Logic, and Concurrent Queues
// ─────────────────────────────────────────────────────────────────────────────
let isRefreshing = false
let failedQueue: Array<{ resolve: (token?: unknown) => void; reject: (err: unknown) => void }> = []

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve()
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any

    if (typeof window === 'undefined') {
      return Promise.reject(error)
    }

    const isAuthEndpoint =
      originalRequest?.url?.includes('/auth/login') ||
      originalRequest?.url?.includes('/auth/register') ||
      originalRequest?.url?.includes('/auth/refresh')

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(() => api(originalRequest))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await api.post('/auth/refresh')
        processQueue(null)
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        // Dispatch a custom event so TanStack Router can handle the redirect
        // This preserves the current URL for redirect-after-login
        window.dispatchEvent(new CustomEvent('auth:logout'))
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Standardize Error Messages for the UI
// ─────────────────────────────────────────────────────────────────────────────
export function getErrorMessage(error: unknown): string {
  let message = 'An error occurred'
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data?.message || error.message
    message = Array.isArray(apiMessage) ? apiMessage.join(', ') : apiMessage
  } else if (error instanceof Error) {
    message = error.message
  }
  return message
}
