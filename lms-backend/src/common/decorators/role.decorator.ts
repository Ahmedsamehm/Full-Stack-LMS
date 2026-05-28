import { SetMetadata } from '@nestjs/common';
import { Roles } from '@prisma/client';

export const ROLES_KEY = 'roles';

// Admin Only (Super Admin + Admin)
export const AdminOnly = () => SetMetadata(ROLES_KEY, [Roles.Super_Admin, Roles.Admin]);

// Teacher Only (Teacher + Admins)
export const TeacherOnly = () => SetMetadata(ROLES_KEY, [Roles.Teacher, Roles.Super_Admin, Roles.Admin]);

// Student Only (Student + everyone above)
export const StudentOnly = () => SetMetadata(ROLES_KEY, [Roles.Student, Roles.Teacher, Roles.Super_Admin, Roles.Admin]);
