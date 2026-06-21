import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import { hashToken } from '../utils/hashToken';
import { env } from '../../../core/config/env';

export interface TokenPayload {
    id: string;
    email: string;
    role: string;
}

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) {}

    async generateTokens(payload: TokenPayload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: env.JWT_ACCESS_SECRET,
                expiresIn: env.JWT_EXPIRES_IN as any,
            }),
            this.jwtService.signAsync(payload, {
                secret: env.JWT_REFRESH_SECRET,
                expiresIn: env.JWT_REFRESH_EXPIRES_IN as any,
            }),
        ]);

        return { accessToken, refreshToken };
    }

    async verifyRefreshToken(token: string): Promise<TokenPayload> {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: env.JWT_REFRESH_SECRET,
            });
        } catch {
            throw new UnauthorizedException('Refresh token is invalid or expired. Please log in again.');
        }
    }

    async storeRefreshToken(token: string, userId: string) {
        const tokenHash = hashToken(token);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await this.prisma.refreshToken.create({
            data: { tokenHash, userId, expiresAt },
        });

        return { tokenHash, expiresAt };
    }

    async rotateRefreshToken(oldTokenHash: string, newToken: string, userId: string) {
        const newTokenHash = hashToken(newToken);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await this.prisma.refreshToken.update({
            where: { tokenHash: oldTokenHash },
            data: { replacedBy: newTokenHash },
        });
        await this.prisma.refreshToken.create({
            data: { tokenHash: newTokenHash, userId, expiresAt },
        });
    }
}
