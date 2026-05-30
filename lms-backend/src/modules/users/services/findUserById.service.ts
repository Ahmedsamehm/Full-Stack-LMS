import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UsersResponseDto } from '../dto/response-user.dto';
import { userSelect } from 'src/common/selects/user.select';

@Injectable()
export class FindUserByIdService {
    constructor(private readonly prisma: PrismaService) {}

    async findUserById(id: string): Promise<UsersResponseDto> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: userSelect,
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
