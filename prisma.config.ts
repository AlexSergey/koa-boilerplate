import dotenv from 'dotenv';
const _env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${_env}` });

import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: env('DATABASE_URL'),
  },
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  schema: 'prisma/schema.prisma',
});
