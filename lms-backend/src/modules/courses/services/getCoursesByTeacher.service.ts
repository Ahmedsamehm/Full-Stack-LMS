import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaginationDto, PaginatedResult } from 'src/common/dto/pagination.dto';
import { CourseWithCategoryResponseDto } from '../dto/response-course.dto';

@Injectable()
export class GetCoursesByTeacherService {
    constructor(private readonly prisma: PrismaService) {}

    async findByTeacher(teacherId: string, pagination: PaginationDto): Promise<PaginatedResult<CourseWithCategoryResponseDto>> {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const where = { teacherId };

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

        if (total === 0) {
            throw new NotFoundException('No courses found for this teacher');
        }

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
