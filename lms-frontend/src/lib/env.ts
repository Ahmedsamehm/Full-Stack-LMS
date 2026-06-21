export const env = {
  VITE_API_URL: import.meta.env.VITE_API_URL || '/api',

  get API_URL() {
    return this.VITE_API_URL
  },

  SSR_API_URL: 'https://backend-full-stack-lms.vercel.app/api',
}
