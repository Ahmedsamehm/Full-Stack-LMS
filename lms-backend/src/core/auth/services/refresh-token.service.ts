import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { hashToken } from '../utils/hashToken';
import { userAuthSelect } from '../../../common/selects/user.select';
import { TokenService } from './token.service';

@Injectable()
export class RefreshTokenService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tokenService: TokenService,
    ) {}

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required');
        }

        const payload = await this.tokenService.verifyRefreshToken(refreshToken);

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

        const { accessToken, refreshToken: newRefreshToken } = await this.tokenService.generateTokens(newPayload);
        await this.tokenService.rotateRefreshToken(tokenHash, newRefreshToken, payload.id);

        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
}
