import { Logger } from 'pino';

export interface ILoggerService {
  logger: Logger;

  log(...args: unknown[]): void;

  error(...args: unknown[]): void;

  warn(...args: unknown[]): void;
}
