import { injectable } from 'inversify';
import pino, { Logger } from 'pino';

import { ILoggerService } from './logger.service.interface';

@injectable()
export class LoggerService implements ILoggerService {
  public logger: Logger;

  constructor() {
    this.logger = pino({
      transport: {
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd'|'HH:MM:ss",
        },
        target: 'pino-pretty',
      },
    });
  }

  log(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
