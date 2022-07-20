import { resolve } from 'node:path';

import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';

import { APP_DI_TYPES } from 'app/app.di-types';
import { ILoggerService } from 'logger/logger.service.interface';

import { IConfigService, EnvType } from './config.service.interface';

const pathToEnvFiles = {
  development: resolve(__dirname, '../../', '.env.development'),
  production: resolve(__dirname, '../../', '.env'),
  test: resolve(__dirname, '../../', '.env.test'),
};

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  private jwtExpiresIn = '7d';

  constructor(@inject(APP_DI_TYPES.LoggerService) private loggerService: ILoggerService) {
    const env = this.getEnv();
    const path = pathToEnvFiles[env];
    const result: DotenvConfigOutput = config({
      path,
    });
    if (result.error) {
      this.loggerService.error('[ConfigService] error:');
      this.loggerService.error(result.error);
    } else {
      this.loggerService.log('[ConfigService] loaded');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key] as string;
  }

  getEnv(): EnvType {
    const envs = Object.keys(pathToEnvFiles);
    const env = (
      typeof process.env.NODE_ENV === 'string' && envs.includes(process.env.NODE_ENV)
        ? process.env.NODE_ENV
        : 'development'
    ) as EnvType;

    return env;
  }

  isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  getJwtExpiresIn(): string {
    return this.jwtExpiresIn;
  }
}
