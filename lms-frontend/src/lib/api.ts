export function getAuthHeaders(request?: Request) {
  if (request) {
    const cookieHeader = request.headers.get("cookie") ?? "";
    return { Cookie: cookieHeader };
  }
  // Fallback for client side, though client side axios withCredentials handles it.
  return {};
}
