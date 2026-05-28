import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RegisterService } from './services/register.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginService } from './services/login.service';
import { RefreshTokenService } from './services/refresh-token.service';
import { logoutService } from './services/logout.service';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ResetPasswordService } from './services/reset-password.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly RegisterService: RegisterService,
        private readonly LoginService: LoginService,
        private readonly RefreshTokenService: RefreshTokenService,
        private readonly LogoutService: logoutService,
        private readonly ForgotPasswordService: ForgotPasswordService,
        private readonly ResetPasswordService: ResetPasswordService,
    ) {}

    create(createAuthDto: CreateAuthDto) {
        return this.RegisterService.create(createAuthDto);
    }

    login(loginAuthDto: LoginAuthDto) {
        return this.LoginService.login(loginAuthDto);
    }

    refresh(refreshToken: string) {
        return this.RefreshTokenService.refresh(refreshToken);
    }

    logout(refreshToken: string) {
        return this.LogoutService.logout(refreshToken);
    }

    forgotPassword(email: string) {
        return this.ForgotPasswordService.forgotPassword(email);
    }

    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.ResetPasswordService.resetPassword(token, password, confirmPassword);
    }
}
