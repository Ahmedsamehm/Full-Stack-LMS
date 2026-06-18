import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { env } from './env'
import { getRequest } from '@tanstack/react-start/server'
const apiUrl = env.VITE_API_URL

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Sends cookies automatically in the browser
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// REQUEST INTERCEPTOR: Handles SSR Base URL and SSR Cookie forwarding
// ─────────────────────────────────────────────────────────────────────────────
api.interceptors.request.use((config) => {
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
  try {
    const request = getRequest()
    const cookieHeader = request?.headers.get('cookie') ?? ''

    if (cookieHeader) {
      config.headers.Cookie = cookieHeader
    }
  } catch (e) {
    console.warn('SSR: Could not get request headers to forward cookies.')
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
  (response) => response, // Pass through successful responses

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // ── SSR Guard ─────────────────────────────────────────────────────────────
    // On the server, we cannot refresh tokens silently (no browser cookie jar).
    // Just reject the error and let the server function (e.g., getUser) handle it.
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

        // Redirect to login if we aren't already on an auth page
        const authPages = ['/login', '/register']
        if (!authPages.includes(window.location.pathname)) {
          window.location.href = '/login'
        }

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
