import { createServerFn } from "@tanstack/react-start";
import api from "#/lib/axios";

export const getDashboardData = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data } = await api.get("/dashboard/data");
    return data;
  });
