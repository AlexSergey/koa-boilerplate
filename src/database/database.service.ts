import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';

import { LoggerServiceInterface } from 'logger/logger.service.interface';
import { APP_DI_TYPES } from 'app/app.di-types';

import { DatabaseServiceInterface } from './database.service.interface';

@injectable()
export class DatabaseService implements DatabaseServiceInterface {
  client: PrismaClient;

  constructor(@inject(APP_DI_TYPES.LoggerService) private loggerService: LoggerServiceInterface) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.loggerService.log('[Prisma] Connected');
    } catch (e) {
      if (e instanceof Error) {
        this.loggerService.error(e.message);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
    this.loggerService.log('[Prisma] Disconnected');
  }
}
