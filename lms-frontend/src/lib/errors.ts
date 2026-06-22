export function extractErrorMessage(err: unknown, fallback = 'Something went wrong'): string {
  const error = err as { response?: { data?: { message?: string | string[] } }; message?: string }
  const msg = error.response?.data?.message || error.message || fallback
  return Array.isArray(msg) ? msg.join(', ') : msg
}
