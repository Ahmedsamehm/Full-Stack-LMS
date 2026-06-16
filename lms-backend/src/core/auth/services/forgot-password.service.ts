import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { MailService } from 'src/core/mail/mail.service';
import { generateToken } from '../utils/generateToken';
import { hashToken } from '../utils/hashToken';
import { findUserByEmailService } from 'src/modules/users/services/findUserByEmail.service';

@Injectable()
export class ForgotPasswordService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService,
        private readonly findUserByEmailService: findUserByEmailService,
    ) {}

    async forgotPassword(email: string) {
        const user = await this.findUserByEmailService.findUserByEmail(email);

        const token = generateToken();
        const tokenHash = hashToken(token);
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await this.prisma.passwordResetToken.create({
            data: {
                tokenHash,
                userId: user.id,
                expiresAt,
            },
        });

        await this.mailService.sendPasswordResetEmail(user.email, token);
    }
}
