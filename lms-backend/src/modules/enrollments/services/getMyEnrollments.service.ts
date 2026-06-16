import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationDto, PaginatedResult } from '../../../common/dto/pagination.dto';
import { enrollmentSelect } from '../../../common/selects/enrollment.select';
import { EnrollmentResponseDto } from '../dto/response-enrollment.dto';

@Injectable()
export class GetMyEnrollmentsService {
    constructor(private readonly prisma: PrismaService) {}

    async findByUserId(userId: string, pagination: PaginationDto): Promise<PaginatedResult<EnrollmentResponseDto>> {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const where = { userId };

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
