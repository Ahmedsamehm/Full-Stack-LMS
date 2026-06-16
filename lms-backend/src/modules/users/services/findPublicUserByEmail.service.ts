import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponseDto } from '../../../core/auth/dto/response-auth.dto';
import { PrismaService } from '../../../core/database/prisma.service';
import { userSelect } from '../../../common/selects/user.select';

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
