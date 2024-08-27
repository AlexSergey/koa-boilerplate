import { Logger } from 'tslog';

enum LOG_TYPE {
  hidden = 'hidden',
  json = 'json',
  pretty = 'pretty',
}

const TYPES = {
  development: LOG_TYPE.pretty,
  production: LOG_TYPE.json,
  test: LOG_TYPE.hidden,
};

const type =
  process.env.NODE_ENV && process.env.NODE_ENV in TYPES
    ? TYPES[process.env.NODE_ENV as keyof typeof TYPES]
    : TYPES.development;

export const logger = new Logger<Record<string, string>>({ type });
