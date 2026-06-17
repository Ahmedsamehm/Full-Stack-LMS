import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

// We don't use getRequest here to avoid context errors outside of SSR requests,
// Instead, we will intercept the request and prepend the URL if we are on the server.
const apiUrl = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercept request to handle SSR relative URLs
api.interceptors.request.use((config) => {
  if (typeof window === 'undefined' && config.baseURL && config.baseURL.startsWith('/')) {
    // We are on the server, and the baseURL is relative.
    // In Vercel, VERCEL_URL is provided for the current deployment.
    // Fallback to localhost if not found.
    const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'localhost:3000'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    config.baseURL = `${protocol}://${host}${config.baseURL}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // ── SSR Guard ─────────────────────────────────────────────────────────────
    // On the server (SSR), there is no browser cookie jar. The refreshToken
    // httpOnly cookie only exists in the browser, so a server-side refresh call
    // will always fail. Let the error propagate; the server-fn caller (getUser)
    // handles 401 gracefully by returning null.
    if (typeof window === 'undefined') {
      return Promise.reject(error)
    }
    // ──────────────────────────────────────────────────────────────────────────

    const isRefreshRequest = originalRequest?.url?.includes('/auth/refresh')
    const isAuthEndpoint = originalRequest?.url?.includes('/auth')

    if (error.response?.status === 401 && !originalRequest?._retry && !isRefreshRequest && !isAuthEndpoint) {
      originalRequest._retry = true

      try {
        // IMPORTANT: use same axios instance
        await api.post('/auth/refresh')

        return api(originalRequest)
      } catch (refreshError: any) {
        const authPages = ['/login', '/register']
        if (!authPages.includes(window.location.pathname)) {
          window.location.href = '/login'
        }

        if (refreshError && typeof refreshError === 'object') {
          refreshError.message = getErrorMessage(refreshError)
        }
        return Promise.reject(refreshError)
      }
    }

    if (error && typeof error === 'object') {
      error.message = getErrorMessage(error)
    }
    return Promise.reject(error)
  },
)


export default api

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
