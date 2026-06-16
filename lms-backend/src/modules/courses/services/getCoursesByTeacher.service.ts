import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationDto, PaginatedResult } from '../../../common/dto/pagination.dto';
import { CourseWithCategoryResponseDto } from '../dto/response-course.dto';
import { courseWithCategorySelect } from '../../../common/selects/course.select';
import { toCourseWithCategoryResponse } from '../dto/course.mapper';

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
                select: courseWithCategorySelect,
            }),
            this.prisma.course.count({ where }),
        ]);

        if (total === 0) {
            throw new NotFoundException('No courses found for this teacher');
        }

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
