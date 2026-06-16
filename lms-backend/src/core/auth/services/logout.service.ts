import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hashToken } from '../utils/hashToken';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class logoutService {
    constructor(private readonly prisma: PrismaService) {}

    async logout(refreshToken: string, userId?: string) {
        if (userId) {
            await this.prisma.refreshToken.deleteMany({
                where: { userId },
            });
            return;
        }

        const tokenHash = hashToken(refreshToken);
        await this.prisma.refreshToken.deleteMany({
            where: { tokenHash },
        });
    }
}
