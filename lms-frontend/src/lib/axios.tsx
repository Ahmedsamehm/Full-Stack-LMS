import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'

const isBrowser = typeof window !== 'undefined'

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

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true

      try {
        await axios.post(
          `${apiUrl}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        )

        return api(originalRequest)
      } catch {
        if (isBrowser) {
          const authPages = ['/login', '/register']

          if (
            !authPages.includes(
              window.location.pathname,
            )
          ) {
            window.location.href = '/login'
          }
        }

        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

export default api