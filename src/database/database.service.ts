import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';

import { logger } from '../logger';

import { IDatabaseService } from './database.service.interface';

@injectable()
export class DatabaseService implements IDatabaseService {
  client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      logger.info('[Prisma] Connected');
    } catch (e) {
      logger.error(e);
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
    logger.info('[Prisma] Disconnected');
  }
}
