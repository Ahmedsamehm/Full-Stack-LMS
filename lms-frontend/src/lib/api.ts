import { getRequest } from "@tanstack/react-start/server";

export function getAuthHeaders() {
  const request = getRequest();
  const cookieHeader = request?.headers.get("cookie") ?? "";
  return { Cookie: cookieHeader };
}
