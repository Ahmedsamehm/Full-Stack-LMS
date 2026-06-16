import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { hashPassword } from 'src/core/auth/utils/hashPassword';
import { Roles, User } from '@prisma/client';
import { UsersResponseDto } from '../dto/response-user.dto';
import { userSelect } from 'src/common/selects/user.select';

@Injectable()
export class UpdateUserService {
    constructor(private readonly prisma: PrismaService) {}

    async update(id: string, dto: UpdateUserDto, currentUserId: string, currentUserRole: string): Promise<UsersResponseDto> {
        const isOwner = currentUserId === id;
        const isAdmin = currentUserRole === Roles.Super_Admin || currentUserRole === Roles.Admin;

        if (!isOwner && !isAdmin) {
            throw new ForbiddenException('You can only update your own data');
        }

        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const { password, ...rest } = dto;

        const data: Partial<User> = { ...rest };

        if (password) {
            data.passwordHash = await hashPassword(password);
        }

        const updated = await this.prisma.user.update({
            where: { id },
            data,
            select: userSelect,
        });

        return updated;
    }
}
