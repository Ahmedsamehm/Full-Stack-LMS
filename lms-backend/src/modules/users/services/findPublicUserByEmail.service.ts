import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponseDto } from 'src/core/auth/dto/response-auth.dto';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class FindPublicUserByEmailService {
    constructor(private readonly prisma: PrismaService) {}
    async findPublicUserByEmail(email: string): Promise<UserResponseDto> {
        const userExist = await this.prisma.user.findUnique({
            where: { email },
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
        if (!userExist) throw new NotFoundException('User not found');

        return userExist;
    }
}
