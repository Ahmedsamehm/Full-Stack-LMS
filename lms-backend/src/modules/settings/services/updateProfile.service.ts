import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { userSelect } from 'src/common/selects/user.select';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UsersResponseDto } from 'src/modules/users/dto/response-user.dto';

@Injectable()
export class UpdateProfileService {
    constructor(private readonly prisma: PrismaService) {}

    async updateProfile(userId: string, dto: UpdateProfileDto): Promise<UsersResponseDto> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (dto.email && dto.email !== user.email) {
            const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
            if (existing) {
                throw new ConflictException('Email already exists');
            }
        }

        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...(dto.name !== undefined && { name: dto.name }),
                ...(dto.email !== undefined && { email: dto.email }),
                ...(dto.bio !== undefined && { bio: dto.bio }),
            },
            select: userSelect,
        });

        return updated;
    }
}
