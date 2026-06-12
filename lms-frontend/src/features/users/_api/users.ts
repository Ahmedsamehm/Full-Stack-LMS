import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import api from "#/lib/axios";

export const getUser = createServerFn({ method: "GET" })
  .handler(async () => {
    const request = getRequest();
    const cookieHeader = request?.headers.get("cookie") ?? "";

    try {
      const { data } = await api.get("/users/me", {
        headers: { Cookie: cookieHeader },
      });
  
      
      return data;
    } catch {
      // 401 / any error → user is not authenticated
      return null;
    }
  });