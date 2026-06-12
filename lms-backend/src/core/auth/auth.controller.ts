import { Controller, Post, Body, HttpStatus, HttpCode, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import type { Request, Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

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
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/api/auth',
        });

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
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
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/api/auth',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }

    private setAccessTokenCookie(res: Response, token: string) {
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/', // Needs to be accessible by all API routes
            maxAge: 15 * 60 * 1000, // 15 minutes, adjust to your JWT_ACCESS_EXPIRES_IN
        });
    }
}
