import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';

// this for auth module don't use out side auth
@Injectable()
export class findUserByEmailService {
    constructor(private readonly prisma: PrismaService) {}
    async findUserByEmail(email: string) {
        const userExist = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!userExist) throw new NotFoundException('User not found');

        return userExist;
    }
}
