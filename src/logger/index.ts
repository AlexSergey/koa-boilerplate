import { join } from 'node:path';

import pino from 'pino';

const logsFolder = 'logs';

const streams = [
  { stream: process.stdout },
  { stream: pino.destination(join(__dirname, '..', '..', logsFolder, 'combined.log')) },
];

export const logger = pino(
  {
    enabled: process.env.NODE_ENV !== 'test',
    transport: {
      options: {
        colorize: true,
        translateTime: "yyyy-mm-dd'|'HH:MM:ss",
      },
      target: 'pino-pretty',
    },
  },
  pino.multistream(streams),
);
