/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultContext } from 'koa';

import { IAuthService } from '../src/features/users/services/auth.service.interface.js';
import { IUsersService } from '../src/features/users/services/users.service.interface.js';

declare module 'koa' {
  interface DefaultContext {
    services: {
      usersService: IUsersService;
      authService: IAuthService;
    };
  }
}
