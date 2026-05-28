import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { PrismaService } from 'src/core/database/prisma.service';
import { hashToken } from '../utils/hashToken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest<Request>();

        const accessToken = this.extractTokenFromHeader(request);
        if (!accessToken) {
            throw new UnauthorizedException('No token provided');
        }

        let payload: any;
        try {
            payload = await this.jwtService.verifyAsync(accessToken, {
                secret: process.env.JWT_ACCESS_SECRET,
            });
        } catch {
            throw new UnauthorizedException('TokenExpired');
        }

        const rawRefreshToken = request.cookies?.['refreshToken'] || request.headers['x-refresh-token'];

        if (!rawRefreshToken) {
            throw new UnauthorizedException('Session expired. Please log in again.');
        }

        const tokenHash = hashToken(rawRefreshToken as string);
        const storedToken = await this.prisma.refreshToken.findUnique({
            where: { tokenHash },
        });

        if (!storedToken) {
            throw new UnauthorizedException('Session expired. Please log in again.');
        }

        request.user = payload;
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
