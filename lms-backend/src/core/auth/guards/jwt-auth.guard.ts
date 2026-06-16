import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { IS_OPTIONAL_AUTH_KEY } from 'src/common/decorators/optional-auth.decorator';
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

        const isOptionalAuth = this.reflector.getAllAndOverride<boolean>(IS_OPTIONAL_AUTH_KEY, [context.getHandler(), context.getClass()]);

        const request = context.switchToHttp().getRequest<Request>();

        const accessToken = this.extractTokenFromHeader(request);

        if (!accessToken) {
            if (isOptionalAuth) return true;
            throw new UnauthorizedException('No token provided');
        }

        let payload: any;
        try {
            payload = await this.jwtService.verifyAsync(accessToken, {
                secret: process.env.JWT_ACCESS_SECRET,
            });
        } catch {
            if (isOptionalAuth) return true;
            throw new UnauthorizedException('Invalid or expired access token');
        }

        request.user = payload;
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return (type === 'Bearer' ? token : undefined) || request.cookies?.['accessToken'];
    }
}
