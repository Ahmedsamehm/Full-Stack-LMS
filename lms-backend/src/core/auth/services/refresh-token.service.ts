import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/database/prisma.service';
import { hashToken } from '../utils/hashToken';
import { userAuthSelect } from 'src/common/selects/user.select';

@Injectable()
export class RefreshTokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) {}

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required');
        }

        let payload: { id: string; email: string; role: string };

        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
        } catch {
            throw new UnauthorizedException('Refresh token is invalid or expired. Please log in again.');
        }

        const tokenHash = hashToken(refreshToken);

        const storedToken = await this.prisma.refreshToken.findUnique({
            where: { tokenHash },
        });

        if (!storedToken) {
            throw new UnauthorizedException('Refresh token has been revoked or is no longer valid.');
        }

        if (storedToken.expiresAt < new Date()) {
            await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });
            throw new UnauthorizedException('Refresh token has expired. Please log in again.');
        }

        const user = await this.prisma.user.findUnique({
            where: { id: payload.id },
            select: userAuthSelect,
        });

        if (!user || user.status !== 'ACTIVE') {
            await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });
            throw new UnauthorizedException('User account is not active. Please contact support.');
        }

        const newPayload = {
            id: payload.id,
            email: payload.email,
            role: payload.role,
        };

        const [accessToken, newRefreshToken] = await Promise.all([
            this.jwtService.signAsync(newPayload, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: process.env.JWT_EXPIRES_IN ?? ('15m' as any),
            }),
            this.jwtService.signAsync(newPayload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? ('7d' as any),
            }),
        ]);

        const newTokenHash = hashToken(newRefreshToken);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await this.prisma.$transaction([
            this.prisma.refreshToken.delete({ where: { id: storedToken.id } }),
            this.prisma.refreshToken.create({
                data: {
                    tokenHash: newTokenHash,
                    userId: payload.id,
                    expiresAt,
                },
            }),
        ]);

        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
}
