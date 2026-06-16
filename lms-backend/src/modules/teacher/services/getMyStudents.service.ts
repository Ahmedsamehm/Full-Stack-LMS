import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationDto, PaginatedResult } from '../../../common/dto/pagination.dto';

@Injectable()
export class GetMyStudentsService {
    constructor(private readonly prisma: PrismaService) {}

    async getMyStudents(teacherId: string, pagination: PaginationDto): Promise<PaginatedResult<any>> {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const where = {
            enrollments: {
                some: {
                    course: {
                        teacherId: teacherId,
                    },
                },
            },
        };

        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    status: true,
                    updatedAt: true,
                    enrollments: {
                        where: {
                            course: {
                                teacherId: teacherId,
                            },
                        },
                        select: {
                            progress: true,
                            course: {
                                select: {
                                    title: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.user.count({ where }),
        ]);

        return {
            data: users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
