import { config } from 'dotenv';
import { resolve } from 'path';

const nodeEnv = process.env.NODE_ENV ?? 'development';
const envFile = nodeEnv === 'production' ? '.env.production' : '.env.development';
config({ path: resolve(process.cwd(), envFile) });

export const env = {
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    PORT: parseInt(process.env.PORT ?? '3000', 10),
    FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:3001',

    DATABASE_URL: process.env.DATABASE_URL!,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '15m',
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    JWT_ACCESS_COOKIE_MAX_AGE: parseInt(process.env.JWT_ACCESS_COOKIE_MAX_AGE ?? String(15 * 60 * 1000), 10),
    JWT_REFRESH_COOKIE_MAX_AGE: parseInt(process.env.JWT_REFRESH_COOKIE_MAX_AGE ?? String(7 * 24 * 60 * 60 * 1000), 10),

    MAIL_HOST: process.env.MAIL_HOST!,
    MAIL_PORT: parseInt(process.env.MAIL_PORT!, 10),
    MAIL_SECURE: process.env.MAIL_SECURE === 'true',
    MAIL_USER: process.env.MAIL_USER!,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD!,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME!,
    MAIL_FROM_EMAIL: process.env.MAIL_FROM_EMAIL!,

    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
} as const;

export function isProduction(): boolean {
    return env.NODE_ENV === 'production';
}

export function corsOrigins(): string[] {
    return env.FRONTEND_URL.split(',').map((o) => o.trim());
}
