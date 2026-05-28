import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { AdminCreateUserDto } from '../dto/admin-create-user.dto';
import { hashPassword } from 'src/core/auth/utils/hashPassword';
import { Roles } from '@prisma/client';
import { UsersResponseDto } from '../dto/response-user.dto';

@Injectable()
export class CreateUserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: AdminCreateUserDto, currentUserRole: string): Promise<UsersResponseDto> {
        const isSuperAdmin = currentUserRole === Roles.Super_Admin;
        const isAdmin = currentUserRole === Roles.Admin;

        if (isAdmin && dto.role === Roles.Super_Admin) {
            throw new ForbiddenException('Admins cannot create users with Super_Admin role');
        }

        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existing) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await hashPassword(dto.password);

        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                passwordHash: hashedPassword,
                role: dto.role,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return user;
    }
}
