import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { Injectable } from 'friendly-di';

import { PrismaClient } from '../../prisma/generated';
import { ConfigService } from '../config/config.service';
import { logger } from '../logger';

@Injectable()
export class DatabaseService extends PrismaClient {
  constructor(private configService: ConfigService) {
    const adapter = new PrismaBetterSqlite3({ url: configService.get('DATABASE_URL') });
    super({ adapter });
  }

  async connect(): Promise<void> {
    try {
      await this.$connect();
      logger.info('[Prisma] Connected');
    } catch (e) {
      logger.error(e);
    }
  }

  async disconnect(): Promise<void> {
    await this.$disconnect();
    logger.info('[Prisma] Disconnected');
  }
}
