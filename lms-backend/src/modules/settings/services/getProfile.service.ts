import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { userSelect } from '../../../common/selects/user.select';
import { UsersResponseDto } from '../../users/dto/response-user.dto';

@Injectable()
export class GetProfileService {
    constructor(private readonly prisma: PrismaService) {}

    async getProfile(userId: string): Promise<UsersResponseDto> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: userSelect,
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
