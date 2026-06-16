import { createServerFn } from "@tanstack/react-start";
import api, { getErrorMessage } from "#/lib/axios";
import { getAuthHeaders } from "#/lib/api";
import {
  courseListParamsSchema,
  paginationParamsSchema,
  createCourseSchema,
  updateCourseParamsSchema,
  changeCourseStatusParamsSchema,
  uuidSchema,
} from "#/schemas";


export const getCourses = createServerFn({ method: "GET" })
  .inputValidator(courseListParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get("/courses", {
      headers: getAuthHeaders(),
      params,
    });
    return data;
  });

export const getMyCourses = createServerFn({ method: "GET" })
  .inputValidator(paginationParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get("/courses/me", {
      headers: getAuthHeaders(),
      params,
    });
    return data;
  });

export const getCourseById = createServerFn({ method: "GET" })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.get(`/courses/${id}`, {
      headers: getAuthHeaders(),
    });
    return data;
  });

export const createCourse = createServerFn({ method: "POST" })
  .inputValidator(createCourseSchema)
  .handler(async ({ data: course }) => {
    try {
      const { data } = await api.post("/courses", course, {
        headers: getAuthHeaders(),
      });
      return { success: true, data };
    } catch (e) {
      return {
        success: false,
        error: getErrorMessage(e),
      };
    }
  });

export const updateCourse = createServerFn({ method: "POST" })
  .inputValidator(updateCourseParamsSchema)
  .handler(async ({ data: { id, course } }) => {
    const { data } = await api.patch(`/courses/${id}`, course, {
      headers: getAuthHeaders(),
    });
    return data;
  });

export const changeCourseStatus = createServerFn({ method: "POST" })
  .inputValidator(changeCourseStatusParamsSchema)
  .handler(async ({ data: { id, status } }) => {
    const { data } = await api.patch(`/courses/${id}/status`, status, {
      headers: getAuthHeaders(),
    });
    return data;
  });

export const deleteCourse = createServerFn({ method: "POST" })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.delete(`/courses/${id}`, {
      headers: getAuthHeaders(),
    });
    return data;
  });

export const getCourseStudents = createServerFn({ method: "GET" })
  .inputValidator(uuidSchema)
  .handler(async ({ data: courseId }) => {
    const { data } = await api.get(`/enrollments/course/${courseId}`, {
      headers: getAuthHeaders(),
      params: { page: 1, limit: 10 },
    });
    return data;
  });

