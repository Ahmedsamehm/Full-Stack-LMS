import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { createIsomorphicFn } from '@tanstack/react-start'
import { env } from './env'

const apiUrl = env.VITE_API_URL

const api = axios.create({
  baseURL: apiUrl,
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

  // SERVER SIDE (SSR): Manually forward cookies to the backend API
  // 1. Fix Base URL for SSR to avoid self-request loops
  if (config.baseURL && config.baseURL.startsWith('/')) {
    config.baseURL = env.SSR_API_URL
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
let failedQueue: Array<{ resolve: () => void; reject: (err: unknown) => void }> = []

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
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // ── SSR Guard ─────────────────────────────────────────────────────────────
    if (typeof window === 'undefined') {
      return Promise.reject(error)
    }
    // ──────────────────────────────────────────────────────────────────────────

    const isRefreshRequest = originalRequest?.url?.includes('/auth/refresh')
    const isLoginOrRegister = originalRequest?.url?.includes('/auth/login') || originalRequest?.url?.includes('/auth/register')

    // If 401 and not already retried and not an auth endpoint
    if (error.response?.status === 401 && !originalRequest?._retry && !isRefreshRequest && !isLoginOrRegister) {
      // If a refresh is already happening, queue this request
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Call refresh endpoint.
        // Browser automatically sends the /auth/refresh HttpOnly cookie!
        await api.post('/auth/refresh')

        // Process the queue: retry all failed requests
        processQueue(null)

        // Retry the original request
        return api(originalRequest)
      } catch (refreshError: any) {
        // If refresh fails, reject all queued requests
        processQueue(refreshError)

        // const authPages = ['/login', '/register']
        // if (!authPages.includes(window.location.pathname)) {
        //   window.location.href = '/login'
        // }

        if (refreshError && typeof refreshError === 'object') {
          refreshError.message = getErrorMessage(refreshError)
        }
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Format error for all other cases (400, 404, 500, etc.)
    if (error && typeof error === 'object') {
      error.message = getErrorMessage(error)
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
