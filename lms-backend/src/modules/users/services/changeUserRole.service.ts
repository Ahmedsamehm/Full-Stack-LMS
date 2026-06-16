import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { ChangeRoleDto } from '../dto/change-role.dto';
import { Roles } from '@prisma/client';
import { UsersResponseDto } from '../dto/response-user.dto';
import { userSelect } from 'src/common/selects/user.select';

@Injectable()
export class ChangeUserRoleService {
    constructor(private readonly prisma: PrismaService) {}

    async changeRole(id: string, dto: ChangeRoleDto, currentUserRole: string): Promise<UsersResponseDto> {
        const isSuperAdmin = currentUserRole === Roles.Super_Admin;
        const isAdmin = currentUserRole === Roles.Admin;

        if (!isSuperAdmin && !isAdmin) {
            throw new ForbiddenException('Only admins can change user roles');
        }

        if (isAdmin && dto.role === Roles.Super_Admin) {
            throw new ForbiddenException('Admins cannot assign the Super_Admin role');
        }

        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const updated = await this.prisma.user.update({
            where: { id },
            data: { role: dto.role },
            select: userSelect,
        });

        return updated;
    }
}
