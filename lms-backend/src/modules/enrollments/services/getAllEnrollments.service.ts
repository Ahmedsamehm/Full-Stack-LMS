import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaginationDto, PaginatedResult } from 'src/common/dto/pagination.dto';
import { enrollmentSelect } from 'src/common/selects/enrollment.select';
import { EnrollmentResponseDto } from '../dto/response-enrollment.dto';

@Injectable()
export class GetAllEnrollmentsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(pagination: PaginationDto): Promise<PaginatedResult<EnrollmentResponseDto>> {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const where = {};

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
