import { PrismaClient } from '@prisma/client';
import { Injectable } from 'friendly-di';

import { logger } from '../logger';

@Injectable()
export class DatabaseService {
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
