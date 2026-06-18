import { config } from 'dotenv';
import { resolve } from 'path';

const nodeEnv = process.env.NODE_ENV ?? 'development';
const envFile = nodeEnv === 'production' ? '.env.production' : '.env.development';
config({ path: resolve(__dirname, envFile) });

import { defineConfig } from 'prisma/config';
import { env } from 'src/core/config/env';

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        url: env.DATABASE_URL,
    },
});
