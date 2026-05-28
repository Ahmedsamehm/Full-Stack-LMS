import { SetMetadata } from "@nestjs/common";
import { Roles } from "@prisma/client";

export const ROLES_KEY ="roles";

// Admin Only (Super Admin + Admin)
export const AdminOnly = () => SetMetadata(ROLES_KEY, [Roles.SUPER_ADMIN, Roles.ADMIN]);

// Teacher Only (Teacher + Admins)
export const TeacherOnly = () => SetMetadata(ROLES_KEY, [Roles.TEACHER, Roles.SUPER_ADMIN, Roles.ADMIN]);

// Student Only (Student + everyone above)
export const StudentOnly = () => SetMetadata(ROLES_KEY, [Roles.STUDENT, Roles.TEACHER, Roles.SUPER_ADMIN, Roles.ADMIN]);