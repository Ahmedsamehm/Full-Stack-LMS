import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { env } from '../../core/config/env';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.MAIL_HOST,
            port: env.MAIL_PORT,
            secure: env.MAIL_SECURE,
            auth: {
                user: env.MAIL_USER,
                pass: env.MAIL_PASSWORD,
            },
        });
    }

    async sendPasswordResetEmail(to: string, token: string) {
        const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
        const html = `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password. This link expires in 15 minutes.</p>
      <a href="${resetUrl}">${resetUrl}</a>
    `;

        await this.transporter.sendMail({
            from: `"${env.MAIL_FROM_NAME}" <${env.MAIL_FROM_EMAIL}>`,
            to,
            subject: 'Password Reset Request',
            html,
        });
    }
}
