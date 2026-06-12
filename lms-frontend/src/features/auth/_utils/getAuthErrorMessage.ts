export function getAuthErrorMessage(error: any, fallback = 'Something went wrong'): string {
  // Try to find the message in the Axios response or a wrapped data object
  let message = 
    error?.response?.data?.message || 
    error?.response?.data?.error || 
    error?.data?.message || 
    error?.data?.error;

  // Handle cases where the backend response is a JSON string
  if (!message && typeof error?.response?.data === 'string') {
    try {
      const parsed = JSON.parse(error.response.data);
      message = parsed.message || parsed.error;
    } catch (e) {
      // Ignore parse errors
    }
  }

  // Handle nested cause (like ServerFnError)
  if (!message && error?.cause) {
    message = error.cause?.response?.data?.message || error.cause?.message;
  }

  if (message) {
    return Array.isArray(message) ? message.join(', ') : message;
  }

  // Fallback to error.message if it's not a generic network message
  if (error?.message && typeof error.message === 'string') {
    if (!error.message.startsWith('Request failed with status code')) {
      let msg = error.message;
      if (msg.startsWith('Error: ')) msg = msg.slice(7);
      return msg;
    }
  }

  return fallback;
}
