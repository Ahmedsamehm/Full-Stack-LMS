import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RegisterService } from './services/register.service';
import { UsersModule } from 'src/modules/users/users.module';
import { LoginService } from './services/login.service';
import { RefreshTokenService } from './services/refresh-token.service';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ResetPasswordService } from './services/reset-password.service';
import { JwtModule } from '@nestjs/jwt';
import { logoutService } from './services/logout.service';
import { MailModule } from 'src/core/mail/mail.module';

@Module({
  imports: [
    UsersModule,
    MailModule,
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterService,
    LoginService,
    RefreshTokenService,
    logoutService,
    ForgotPasswordService,
    ResetPasswordService,
  ],
})
export class AuthModule {}
