import { ContainerModule, interfaces } from 'inversify';

import { UsersController } from './controllers/users.controller';
import { IUsersController } from './controllers/users.controller.interface';
import { UsersRepository } from './repositories/users.repository';
import { IUsersRepository } from './repositories/users.repository.interface';
import { AuthService } from './services/auth.service';
import { IAuthService } from './services/auth.service.interface';
import { UsersService } from './services/users.service';
import { IUsersService } from './services/users.service.interface';
import { USERS_DI_TYPES } from './users.di-types';

export const usersBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUsersController>(USERS_DI_TYPES.UsersController).to(UsersController).inSingletonScope();
  bind<IUsersRepository>(USERS_DI_TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
  bind<IUsersService>(USERS_DI_TYPES.UsersService).to(UsersService).inSingletonScope();
  bind<IAuthService>(USERS_DI_TYPES.AuthService).to(AuthService).inSingletonScope();
});
