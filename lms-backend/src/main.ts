import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import { env, corsOrigins } from './core/config/env';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser());

    // Fix for cross-origin cookies locally
    app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

    app.enableCors({
        origin: env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'x-lang', 'accept-language', 'stripe-signature'],
        credentials: true,
    });

    app.setGlobalPrefix('api');

    app.use(
        express.json({
            verify: (req: any, buf) => {
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

    await app.listen(env.PORT);
}
bootstrap();
