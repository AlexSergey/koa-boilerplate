import { Logger } from 'tslog';

enum LogTypes {
  hidden = 'hidden',
  json = 'json',
  pretty = 'pretty',
}

const TYPES = {
  development: LogTypes.pretty,
  production: LogTypes.json,
  test: LogTypes.hidden,
};

const type =
  process.env.NODE_ENV && process.env.NODE_ENV in TYPES
    ? TYPES[process.env.NODE_ENV as keyof typeof TYPES]
    : TYPES.development;

export const logger = new Logger<Record<string, string>>({ type });
