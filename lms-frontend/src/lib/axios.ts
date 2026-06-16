import axios, {
  AxiosError,
  type  InternalAxiosRequestConfig,
} from 'axios'

const apiUrl =
  import.meta.env.VITE_API_URL ||
  'http://localhost:3000/api'

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as InternalAxiosRequestConfig & {
        _retry?: boolean
      }

    const isRefreshRequest =
      originalRequest?.url?.includes('/auth/refresh')

    const isAuthEndpoint =
      originalRequest?.url?.includes('/auth')

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isRefreshRequest &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true

      try {
        // IMPORTANT: use same axios instance
        await api.post('/auth/refresh')

        return api(originalRequest)
      } catch (refreshError: any) {
        if (typeof window !== 'undefined') {
          const authPages = ['/login', '/register']

          if (
            !authPages.includes(window.location.pathname)
          ) {
            window.location.href = '/login'
          }
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
  let message = "An error occurred";
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data?.message || error.message;
    message = Array.isArray(apiMessage) ? apiMessage.join(", ") : apiMessage;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return message;
}