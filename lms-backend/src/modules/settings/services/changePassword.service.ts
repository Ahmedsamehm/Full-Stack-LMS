import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { comparePassword } from 'src/core/auth/utils/comparePassword';
import { hashPassword } from 'src/core/auth/utils/hashPassword';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class ChangePasswordService {
    constructor(private readonly prisma: PrismaService) {}

    async changePassword(userId: string, dto: ChangePasswordDto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isCurrentPasswordValid = await comparePassword(dto.currentPassword, user.passwordHash);

        if (!isCurrentPasswordValid) {
            throw new UnauthorizedException('Current password is incorrect');
        }

        if (dto.currentPassword === dto.newPassword) {
            throw new BadRequestException('New password must be different from current password');
        }

        const hashedPassword = await hashPassword(dto.newPassword);

        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: userId },
                data: { passwordHash: hashedPassword },
            }),
            this.prisma.refreshToken.deleteMany({
                where: { userId },
            }),
        ]);

        return { message: 'Password changed successfully' };
    }
}
