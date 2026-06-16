import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaginationDto, PaginatedResult } from 'src/common/dto/pagination.dto';
import { CourseWithCategoryResponseDto } from '../dto/response-course.dto';
import { CourseStatus, Prisma, Roles } from '@prisma/client';
import { courseWithCategorySelect } from 'src/common/selects/course.select';
import { toCourseWithCategoryResponse } from '../dto/course.mapper';

@Injectable()
export class GetAllPublishedCoursesService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(
        pagination: PaginationDto,
        categoryId?: string,
        search?: string,
        teacherId?: string,
        userRole?: Roles,
        userId?: string,
        status?: CourseStatus,
    ): Promise<PaginatedResult<CourseWithCategoryResponseDto>> {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const isAdmin = userRole === Roles.Super_Admin || userRole === Roles.Admin;
        const isTeacher = userRole === Roles.Teacher;

        const where: Prisma.CourseWhereInput = {
            // Admins/Teachers can filter by status; public sees only PUBLISHED
            ...(!isAdmin && !isTeacher ? { status: CourseStatus.PUBLISHED } : status ? { status } : {}),
            // Teachers are automatically scoped to their own courses (backend-enforced)
            ...(isTeacher && userId ? { teacherId: userId } : {}),
            // Admins can optionally filter by a specific teacherId from query params
            ...(isAdmin && teacherId ? { teacherId } : {}),
            ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}),
        };

        if (categoryId) {
            if (this.isValidUUID(categoryId)) {
                where.categoryId = categoryId;
            } else {
                where.category = {
                    name: { contains: categoryId, mode: 'insensitive' },
                };
            }
        }

        const [courses, total] = await Promise.all([
            this.prisma.course.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: courseWithCategorySelect,
            }),
            this.prisma.course.count({ where }),
        ]);

        return {
            data: courses.map(toCourseWithCategoryResponse),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    private isValidUUID(uuid: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
    }
}
