import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RegisterService } from './services/register.service';
import { UsersModule } from '../../modules/users/users.module';
import { LoginService } from './services/login.service';
import { RefreshTokenService } from './services/refresh-token.service';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ResetPasswordService } from './services/reset-password.service';
import { JwtModule } from '@nestjs/jwt';
import { logoutService } from './services/logout.service';
import { MailModule } from '../mail/mail.module';
import { PrismaService } from '../database/prisma.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
    imports: [UsersModule, MailModule, JwtModule.register({ global: true })],
    controllers: [AuthController],
    providers: [AuthService, RegisterService, LoginService, RefreshTokenService, logoutService, ForgotPasswordService, ResetPasswordService, PrismaService, JwtAuthGuard],
    exports: [JwtAuthGuard],
})
export class AuthModule {}
