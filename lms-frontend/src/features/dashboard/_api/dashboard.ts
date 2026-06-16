import { createServerFn } from "@tanstack/react-start";
import api from "#/lib/axios";
import { getAuthHeaders } from "#/lib/api";

export const getDashboardData = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data } = await api.get("/dashboard/data", {
      headers: getAuthHeaders(),
    });
    return data;
  });
