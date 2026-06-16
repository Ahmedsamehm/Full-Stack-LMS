import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaginationDto, PaginatedResult } from 'src/common/dto/pagination.dto';
import { CourseWithCategoryResponseDto } from '../dto/response-course.dto';
import { courseWithCategorySelect } from 'src/common/selects/course.select';
import { toCourseWithCategoryResponse } from '../dto/course.mapper';
import { Roles, Prisma } from '@prisma/client';

@Injectable()
export class GetMyCoursesService {
    constructor(private readonly prisma: PrismaService) {}

    async findMyCourses(userId: string, pagination: PaginationDto, userRole?: Roles): Promise<PaginatedResult<CourseWithCategoryResponseDto>> {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const where: Prisma.CourseWhereInput = {};
        if (userRole === Roles.Student) {
            where.enrollments = {
                some: {
                    userId: userId,
                },
            };
        } else {
            where.teacherId = userId;
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
}
