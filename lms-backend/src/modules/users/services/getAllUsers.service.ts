import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UsersResponseDto } from '../dto/response-user.dto';

@Injectable()
export class GetAllUsersService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllUsers(): Promise<UsersResponseDto[]> {
        const users: UsersResponseDto[] = await this.prisma.user.findMany({
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

        return users;
    }
}
