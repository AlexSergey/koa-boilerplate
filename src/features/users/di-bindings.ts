import { ContainerModule, interfaces } from 'inversify';

import { USERS_DI_TYPES } from './users.di-types';
import { UsersControllerInterface } from './controllers/users.controller.interface';
import { UsersController } from './controllers/users.controller';
import { UsersRepositoryInterface } from './repositories/users.repository.interface';
import { UsersRepository } from './repositories/users.repository';
import { UsersServiceInterface } from './services/users.service.interface';
import { UsersService } from './services/users.service';
import { AuthServiceInterface } from './services/auth.service.interface';
import { AuthService } from './services/auth.service';

export const usersBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<UsersControllerInterface>(USERS_DI_TYPES.UsersController).to(UsersController).inSingletonScope();
  bind<UsersRepositoryInterface>(USERS_DI_TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
  bind<UsersServiceInterface>(USERS_DI_TYPES.UsersService).to(UsersService).inSingletonScope();
  bind<AuthServiceInterface>(USERS_DI_TYPES.AuthService).to(AuthService).inSingletonScope();
});
