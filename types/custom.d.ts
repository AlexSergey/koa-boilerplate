/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultContext } from 'koa';

import { AuthServiceInterface } from '../src/features/users/services/auth.service.interface';
import { UsersServiceInterface } from '../src/features/users/services/users.service.interface';

declare module 'koa' {
  interface DefaultContext {
    services: {
      authService: AuthServiceInterface;
      usersService: UsersServiceInterface;
    };
  }
}
