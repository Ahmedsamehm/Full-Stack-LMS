import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';
import { Reflector } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import express from 'express';
import { env } from '../src/core/config/env';

const server = express();
export const config = {
    api: {
        bodyParser: false,
    },
};
async function createApp() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.use(cookieParser());
    app.use(helmet());

    const corsOrigins = env.FRONTEND_URL.split(',').map((o) => o.trim());

    app.enableCors({
        origin: corsOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'x-lang', 'accept-language', 'stripe-signature'],
        credentials: true,
    });

    app.setGlobalPrefix('api');

    app.use(
        express.json({
            verify: (req: any, res, buf) => {
                req.rawBody = buf;
            },
        }),
    );

    app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            stopAtFirstError: true,
        }),
    );

    await app.init();
    return app;
}

let cachedApp: Awaited<ReturnType<typeof createApp>> | null = null;

export default async function handler(req: any, res: any) {
    if (!cachedApp) {
        cachedApp = await createApp();
    }
    server(req, res);
}
