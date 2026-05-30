import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaginationDto, PaginatedResult } from 'src/common/dto/pagination.dto';
import { UsersResponseDto } from '../dto/response-user.dto';
import { userSelect } from 'src/common/selects/user.select';

@Injectable()
export class GetAllUsersService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllUsers(pagination: PaginationDto): Promise<PaginatedResult<UsersResponseDto>> {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const where = {};

        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: userSelect,
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
