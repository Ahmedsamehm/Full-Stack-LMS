import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { findUserByEmailService } from '../../../modules/users/services/findUserByEmail.service';
import { comparePassword } from '../utils/comparePassword';
import { TokenService } from './token.service';

@Injectable()
export class LoginService {
    constructor(
        private readonly findUserByEmailService: findUserByEmailService,
        private readonly tokenService: TokenService,
    ) {}

    async login(loginAuthDto: LoginAuthDto) {
        const user = await this.findUserByEmailService.findUserByEmail(loginAuthDto.email);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        const isMatch = await comparePassword(loginAuthDto.password, user.passwordHash);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        const { accessToken, refreshToken } = await this.tokenService.generateTokens(payload);
        await this.tokenService.storeRefreshToken(refreshToken, user.id);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    }
}
