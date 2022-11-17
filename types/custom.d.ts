/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultContext } from 'koa';

import { IAuthService } from '../src/features/users/services/auth.service.interface';
import { IUsersService } from '../src/features/users/services/users.service.interface';

declare module 'koa' {
  interface DefaultContext {
    services: {
      usersService: IUsersService;
      authService: IAuthService;
    };
  }
}
