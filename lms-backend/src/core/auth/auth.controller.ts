import { Controller, Post, Body, HttpStatus, HttpCode, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import type { Request, Response } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { OptionalAuth } from '../../common/decorators/optional-auth.decorator';
import { env, isProduction } from '../../core/config/env';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('User created successfully')
    create(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.create(createAuthDto);
    }

    @Post('login')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('User logged in successfully')
    async login(@Body() loginAuthDto: LoginAuthDto, @Res({ passthrough: true }) res: Response) {
        const result = await this.authService.login(loginAuthDto);
        this.setRefreshTokenCookie(res, result.refreshToken);
        this.setAccessTokenCookie(res, result.accessToken);
        return { user: result.user };
    }

    @Post('refresh')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Token refreshed successfully')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }
        const result = await this.authService.refresh(refreshToken);
        this.setRefreshTokenCookie(res, result.refreshToken);
        this.setAccessTokenCookie(res, result.accessToken);
        return { success: true };
    }

    // auth.controller.ts

    @Post('logout')
    @OptionalAuth()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Logged out successfully')
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const refreshToken = req.cookies?.['refreshToken'];
        const userId = (req as any).user?.id;

        if (refreshToken) {
            await this.authService.logout(refreshToken, userId);
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
        });

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
        });

        return { success: true };
    }

    @Post('forgot-password')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Password reset link sent to your email')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        await this.authService.forgotPassword(forgotPasswordDto.email);
    }

    @Post('reset-password')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Password reset successfully')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        await this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.NewPassword, resetPasswordDto.confirmNewPassword);
    }

    private setRefreshTokenCookie(res: Response, token: string) {
        res.cookie('refreshToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: env.JWT_REFRESH_COOKIE_MAX_AGE,
        });
    }

    private setAccessTokenCookie(res: Response, token: string) {
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: env.JWT_ACCESS_COOKIE_MAX_AGE,
        });
    }
}
