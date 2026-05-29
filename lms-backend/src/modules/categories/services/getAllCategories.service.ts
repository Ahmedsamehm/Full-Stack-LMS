import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaginationDto, PaginatedResult } from 'src/common/dto/pagination.dto';
import { CategoryResponseDto } from '../dto/response-category.dto';

@Injectable()
export class GetAllCategoriesService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(pagination: PaginationDto): Promise<PaginatedResult<CategoryResponseDto>> {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const where = {};

        const [categories, total] = await Promise.all([
            this.prisma.category.findMany({
                where,
                skip,
                take: limit,
                orderBy: { name: 'asc' },
                select: { id: true, name: true, slug: true, createdAt: true, updatedAt: true },
            }),
            this.prisma.category.count({ where }),
        ]);

        return {
            data: categories,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
