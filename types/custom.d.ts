/* eslint-disable no-unused-vars */
import { DefaultContext } from 'koa';

import { LoggerServiceInterface } from '../src/logger/logger.service.interface';
import { UsersServiceInterface } from '../src/features/users/services/users.service.interface';
import { AuthServiceInterface } from '../src/features/users/services/auth.service.interface';

declare module 'koa' {
  interface DefaultContext {
    logger: LoggerServiceInterface;
    services: {
      usersService: UsersServiceInterface;
      authService: AuthServiceInterface;
    };
  }
}
