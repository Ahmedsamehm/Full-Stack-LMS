import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaginationDto, PaginatedResult } from 'src/common/dto/pagination.dto';
import { CourseWithCategoryResponseDto } from '../dto/response-course.dto';
import { Roles } from '@prisma/client';

@Injectable()
export class GetAllPublishedCoursesService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(
        pagination: PaginationDto,
        categoryId?: string,
        search?: string,
        userRole?: Roles,
    ): Promise<PaginatedResult<CourseWithCategoryResponseDto>> {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const isAdmin = userRole === Roles.Super_Admin || userRole === Roles.Admin;

        const where = {
            ...(isAdmin ? {} : { status: 'PUBLISHED' as const }),
            ...(categoryId ? { categoryId } : {}),
            ...(search ? { title: { contains: search, mode: 'insensitive' as const } } : {}),
        };

        const [courses, total] = await Promise.all([
            this.prisma.course.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    price: true,
                    categoryId: true,
                    thumbnailUrl: true,
                    teacherId: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    category: { select: { id: true, name: true, slug: true } },
                    _count: { select: { enrollments: true } },
                },
            }),
            this.prisma.course.count({ where }),
        ]);

        return {
            data: courses,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
