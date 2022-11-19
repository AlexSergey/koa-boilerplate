import { Middleware } from 'koa';

import { logger } from '../logger';

import { BaseError } from './common/base.error';
import { BadRequestError } from './error-types';

export const errorHandlerMiddleware = (): Middleware => {
  return async function handle(ctx, next): Promise<void> {
    try {
      await next();
    } catch (err) {
      logger.error(err);

      if (err instanceof BaseError) {
        const pureError = err.get();
        ctx.status = pureError.statusCode;

        ctx.body = pureError;
      } else {
        const badRequest = new BadRequestError();
        const pureError = badRequest.get();

        ctx.status = pureError.statusCode;

        ctx.body = pureError;
      }
    }
  };
};
