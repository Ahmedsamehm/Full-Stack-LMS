import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponseDto } from 'src/core/auth/dto/response-auth.dto';
import { PrismaService } from 'src/core/database/prisma.service';
import { userSelect } from 'src/common/selects/user.select';

@Injectable()
export class FindPublicUserByEmailService {
    constructor(private readonly prisma: PrismaService) {}
    async findPublicUserByEmail(email: string): Promise<UserResponseDto> {
        const userExist = await this.prisma.user.findUnique({
            where: { email },
            select: userSelect,
        });
        if (!userExist) throw new NotFoundException('User not found');

        return userExist;
    }
}
