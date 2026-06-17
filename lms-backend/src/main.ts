import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser());
    app.use(helmet());

    const corsOrigins = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map((o) => o.trim()) : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'];

    app.enableCors({
        origin: corsOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'x-lang', 'accept-language', 'stripe-signature', 'x-refresh-token'],
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

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
