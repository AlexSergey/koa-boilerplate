import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { Injectable } from 'friendly-di';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { logger } from '../logger';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const pathToEnvFiles = {
  development: resolve(__dirname, '../../', '.env.development'),
  production: resolve(__dirname, '../../', '.env'),
  test: resolve(__dirname, '../../', '.env.test'),
};

enum EnvType {
  development = 'development',
  production = 'production',
  test = 'test',
}

@Injectable()
export class ConfigService {
  private config: DotenvParseOutput;

  private jwtExpiresIn = '7d';

  constructor() {
    const env = this.getEnv();
    const path = pathToEnvFiles[env];
    const result: DotenvConfigOutput = config({
      path,
    });
    if (result.error) {
      logger.error('[ConfigService] error:');
      logger.error(result.error);
    } else {
      logger.info('[ConfigService] loaded');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key] as string;
  }

  getEnv(): EnvType {
    const envs = Object.keys(pathToEnvFiles);

    return (
      typeof process.env.NODE_ENV === 'string' && envs.includes(process.env.NODE_ENV)
        ? process.env.NODE_ENV
        : 'development'
    ) as EnvType;
  }

  getJwtExpiresIn(): string {
    return this.jwtExpiresIn;
  }

  isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }
}
