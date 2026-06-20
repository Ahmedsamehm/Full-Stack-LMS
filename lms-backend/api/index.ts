import { NestFactory } from '@nestjs/core';

import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { corsOrigins } from 'src/core/config/env';
import { AppModule } from 'src/app.module';

const server = express();

let cachedApp;

async function bootstrapServer() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.use(cookieParser());

    app.enableCors({
        origin: corsOrigins,
        credentials: true,
    });

    await app.init();

    return server;
}

export default async function handler(req, res) {
    if (!cachedApp) {
        cachedApp = await bootstrapServer();
    }

    return cachedApp(req, res);
}
