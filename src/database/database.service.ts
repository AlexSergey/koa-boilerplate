import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { APP_DI_TYPES } from 'app/app.di-types';
import { ILoggerService } from 'logger/logger.service.interface';

import { IDatabaseService } from './database.service.interface';

@injectable()
export class DatabaseService implements IDatabaseService {
  client: PrismaClient;

  constructor(@inject(APP_DI_TYPES.LoggerService) private loggerService: ILoggerService) {
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
