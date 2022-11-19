import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Middleware } from 'koa';

import { ValidationError } from '../errors';

export const validateMiddleware = (dto: ClassConstructor<object>): Middleware => {
  return async (ctx, next): Promise<void> => {
    const instance = plainToInstance(dto, ctx.request.body);
    const errors = await validate(instance);

    if (errors.length > 0) {
      const errorsData = errors.reduce<Record<string, string>>((src, error) => {
        if (error.constraints) {
          src[error.property] = Object.values(error.constraints).join(', ');
        }

        return src;
      }, {});

      const pureError = new ValidationError(errorsData).get();
      ctx.status = pureError.statusCode;
      ctx.body = pureError;
    } else {
      await next();
    }
  };
};
