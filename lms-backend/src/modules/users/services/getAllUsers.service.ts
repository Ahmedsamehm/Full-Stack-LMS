import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { UserQueryDto, PaginatedResult } from '../../../common/dto/pagination.dto';
import { UsersResponseDto } from '../dto/response-user.dto';
import { userSelect } from '../../../common/selects/user.select';
import { Roles } from '@prisma/client';

@Injectable()
export class GetAllUsersService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllUsers(query: UserQueryDto, currentUserId: string, currentUserRole: string): Promise<PaginatedResult<UsersResponseDto>> {
        const { page, limit, role, search } = query;
        const skip = (page - 1) * limit;

        const where: any = {};

        if (search) {
            where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }];
        }

        if (currentUserRole === Roles.Admin || currentUserRole === Roles.Super_Admin) {
            if (role) {
                where.role = role;
            }
        } else {
            where.enrollments = {
                some: {
                    course: {
                        teacherId: currentUserId,
                    },
                },
            };
        }

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
