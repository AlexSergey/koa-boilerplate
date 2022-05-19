import { PrismaClient } from '@prisma/client';

export interface DatabaseServiceInterface {
  client: PrismaClient;

  connect(): Promise<void>;

  disconnect(): Promise<void>;
}
