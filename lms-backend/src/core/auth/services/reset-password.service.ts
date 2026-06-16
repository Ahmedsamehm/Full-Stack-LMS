import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { hashToken } from '../utils/hashToken';
import { hashPassword } from '../utils/hashPassword';

@Injectable()
export class ResetPasswordService {
    constructor(private readonly prisma: PrismaService) {}

    async resetPassword(token: string, password: string, confirmPassword: string) {
        if (password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        const tokenHash = hashToken(token);

        const storedToken = await this.prisma.passwordResetToken.findUnique({
            where: { tokenHash },
        });

        if (!storedToken) {
            throw new UnauthorizedException('Invalid or expired reset token');
        }

        if (storedToken.expiresAt < new Date()) {
            await this.prisma.passwordResetToken.delete({ where: { id: storedToken.id } });
            throw new UnauthorizedException('Reset token has expired');
        }

        const hashedPassword = await hashPassword(password);

        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: storedToken.userId },
                data: { passwordHash: hashedPassword },
            }),
            this.prisma.passwordResetToken.delete({ where: { id: storedToken.id } }),
            this.prisma.refreshToken.deleteMany({
                where: { userId: storedToken.userId },
            }),
        ]);
    }
}
