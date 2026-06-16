import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaginationDto, PaginatedResult } from 'src/common/dto/pagination.dto';
import { enrollmentSelect } from 'src/common/selects/enrollment.select';
import { EnrollmentResponseDto } from '../dto/response-enrollment.dto';

@Injectable()
export class GetEnrollmentsByCourseService {
    constructor(private readonly prisma: PrismaService) {}

    async findByCourseId(courseId: string, teacherId: string, pagination: PaginationDto): Promise<PaginatedResult<EnrollmentResponseDto>> {
        const course = await this.prisma.course.findFirst({ where: { id: courseId, teacherId } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const where = { courseId };

        const [enrollments, total] = await Promise.all([
            this.prisma.enrollment.findMany({
                where,
                skip,
                take: limit,
                orderBy: { enrolledAt: 'desc' },
                select: enrollmentSelect,
            }),
            this.prisma.enrollment.count({ where }),
        ]);

        return {
            data: enrollments,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
