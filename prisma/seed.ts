import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { Container, inject, injectable } from 'inversify';

import { APP_DI_TYPES } from 'app';
import { ConfigService } from 'config/config.service';
import { IConfigService } from 'config/config.service.interface';
import { DatabaseService } from 'database/database.service';
import { IDatabaseService } from 'database/database.service.interface';
import { UserRegisterDto } from 'features/users/dtos/user-register.dto';
import { UsersRepository } from 'features/users/repositories/users.repository';
import { IUsersRepository } from 'features/users/repositories/users.repository.interface';
import { UsersService } from 'features/users/services/users.service';
import { IUsersService } from 'features/users/services/users.service.interface';
import { USERS_DI_TYPES } from 'features/users/users.di-types';
import { LoggerService } from 'logger/logger.service';
import { ILoggerService } from 'logger/logger.service.interface';

@injectable()
class SeedAdminUser {
  static key = 'seedAdmin';

  constructor(
    @inject(APP_DI_TYPES.ConfigService) private configService: IConfigService,
    @inject(APP_DI_TYPES.DatabaseService) private databaseService: IDatabaseService,
    @inject(APP_DI_TYPES.LoggerService) private loggerService: ILoggerService,
    @inject(USERS_DI_TYPES.UsersService) private usersService: IUsersService,
  ) {}

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
    this.loggerService.log(`Admin user for ${this.configService.getEnv()} environment was created`);
  };

  disconnect = async (): Promise<void> => {
    await this.databaseService.disconnect();
  };
}
const container = new Container();
container.bind<IUsersRepository>(USERS_DI_TYPES.UsersRepository).to(UsersRepository);
container.bind<IUsersService>(USERS_DI_TYPES.UsersService).to(UsersService);
container.bind<IDatabaseService>(APP_DI_TYPES.DatabaseService).to(DatabaseService);
container.bind<ILoggerService>(APP_DI_TYPES.LoggerService).to(LoggerService);
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
