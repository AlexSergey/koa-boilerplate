import { Logger } from 'pino';

export interface LoggerServiceInterface {
  logger: Logger;

  log(...args: unknown[]): void;

  error(...args: unknown[]): void;

  warn(...args: unknown[]): void;
}
