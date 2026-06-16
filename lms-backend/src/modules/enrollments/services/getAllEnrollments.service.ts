import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaginationDto, PaginatedResult } from 'src/common/dto/pagination.dto';
import { EnrollmentQueryDto } from '../dto/enrollment-query.dto';
import { enrollmentSelect } from 'src/common/selects/enrollment.select';
import { EnrollmentResponseDto } from '../dto/response-enrollment.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class GetAllEnrollmentsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(query: EnrollmentQueryDto): Promise<PaginatedResult<EnrollmentResponseDto>> {
        const { page, limit, search, status } = query;
        const skip = (page - 1) * limit;

        const where: Prisma.EnrollmentWhereInput = {};

        if (status) {
            where.status = status;
        }

        if (search) {
            where.OR = [
                { user: { name: { contains: search, mode: 'insensitive' } } },
                { user: { email: { contains: search, mode: 'insensitive' } } },
                { course: { title: { contains: search, mode: 'insensitive' } } },
            ];
        }

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
