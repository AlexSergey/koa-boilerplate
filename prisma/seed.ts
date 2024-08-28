import { plainToInstance } from 'class-transformer';
import { Container, inject, injectable } from 'inversify';
import 'reflect-metadata';

import { APP_DI_TYPES } from '../src/app/app.di-types';
import { ConfigService } from '../src/config/config.service';
import { IConfigService } from '../src/config/config.service.interface';
import { DatabaseService } from '../src/database/database.service';
import { IDatabaseService } from '../src/database/database.service.interface';
import { UserRegisterDto } from '../src/features/users/dtos/user-register.dto';
import { UsersRepository } from '../src/features/users/repositories/users.repository';
import { IUsersRepository } from '../src/features/users/repositories/users.repository.interface';
import { UsersService } from '../src/features/users/services/users.service';
import { IUsersService } from '../src/features/users/services/users.service.interface';
import { USERS_DI_TYPES } from '../src/features/users/users.di-types';
import { logger } from '../src/logger';

@injectable()
class SeedAdminUser {
  static readonly key = 'seedAdmin';

  apply = async (): Promise<void> => {
    const name = this.configService.get('SEED_ADMIN_USER_NAME');
    const email = this.configService.get('SEED_ADMIN_USER_EMAIL');
    const password = this.configService.get('SEED_ADMIN_USER_PASSWORD');
    const instance = plainToInstance(UserRegisterDto, {
      email,
      name,
      password,
    });
    await this.usersService.createUser(instance);
    logger.info(`Admin user for ${this.configService.getEnv()} environment was created`);
  };

  disconnect = async (): Promise<void> => {
    await this.databaseService.disconnect();
  };

  constructor(
    @inject(APP_DI_TYPES.ConfigService) private configService: IConfigService,
    @inject(APP_DI_TYPES.DatabaseService) private databaseService: IDatabaseService,
    @inject(USERS_DI_TYPES.UsersService) private usersService: IUsersService,
  ) {}
}
const container = new Container();
container.bind<IUsersRepository>(USERS_DI_TYPES.UsersRepository).to(UsersRepository);
container.bind<IUsersService>(USERS_DI_TYPES.UsersService).to(UsersService);
container.bind<IDatabaseService>(APP_DI_TYPES.DatabaseService).to(DatabaseService);
container.bind<IConfigService>(APP_DI_TYPES.ConfigService).to(ConfigService);
container.bind<SeedAdminUser>(SeedAdminUser.key).to(SeedAdminUser);

const seedAdmin = container.get<SeedAdminUser>(SeedAdminUser.key);
seedAdmin
  .apply()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.log(e);

    process.exit(1);
  })
  .finally(seedAdmin.disconnect);
