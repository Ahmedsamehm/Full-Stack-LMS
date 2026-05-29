import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UsersResponseDto } from '../dto/response-user.dto';

@Injectable()
export class FindUserByIdService {
    constructor(private readonly prisma: PrismaService) {}

    async findUserById(id: string): Promise<UsersResponseDto> {
        console.log(id);
        
        const user = await this.prisma.user.findUnique({
            where: { id },
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

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
