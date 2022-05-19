import pino, { Logger } from 'pino';
import { injectable } from 'inversify';

import { LoggerServiceInterface } from './logger.service.interface';

@injectable()
export class LoggerService implements LoggerServiceInterface {
  public logger: Logger;

  constructor() {
    this.logger = pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd'|'HH:MM:ss",
        },
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
