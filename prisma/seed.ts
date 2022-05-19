import 'reflect-metadata';
import { Container, inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';

import { APP_DI_TYPES } from 'app';
import { USERS_DI_TYPES } from 'features/users/users.di-types';
import { ConfigServiceInterface } from 'config/config.service.interface';
import { ConfigService } from 'config/config.service';
import { LoggerServiceInterface } from 'logger/logger.service.interface';
import { LoggerService } from 'logger/logger.service';
import { UsersServiceInterface } from 'features/users/services/users.service.interface';
import { UsersService } from 'features/users/services/users.service';
import { UserRegisterDto } from 'features/users/dtos/user-register.dto';
import { UsersRepository } from 'features/users/repositories/users.repository';
import { UsersRepositoryInterface } from 'features/users/repositories/users.repository.interface';
import { DatabaseService } from 'database/database.service';
import { DatabaseServiceInterface } from 'database/database.service.interface';

@injectable()
class SeedAdminUser {
  static key = 'seedAdmin';

  constructor(
    @inject(APP_DI_TYPES.ConfigService) private configService: ConfigServiceInterface,
    @inject(APP_DI_TYPES.DatabaseService) private databaseService: DatabaseServiceInterface,
    @inject(APP_DI_TYPES.LoggerService) private loggerService: LoggerServiceInterface,
    @inject(USERS_DI_TYPES.UsersService) private usersService: UsersServiceInterface,
  ) {}

  apply = async (): Promise<void> => {
    const name = this.configService.get('SEED_ADMIN_USER_NAME');
    const email = this.configService.get('SEED_ADMIN_USER_EMAIL');
    const password = this.configService.get('SEED_ADMIN_USER_PASSWORD');
    const instance = plainToInstance(UserRegisterDto, {
      name,
      email,
      password,
    });
    await this.usersService.createUser(instance);
    this.loggerService.log(`Admin user for ${this.configService.getEnv()} environment was created`);
  };

  disconnect = async () => {
    await this.databaseService.disconnect();
  };
}
const container = new Container();
container.bind<UsersRepositoryInterface>(USERS_DI_TYPES.UsersRepository).to(UsersRepository);
container.bind<UsersServiceInterface>(USERS_DI_TYPES.UsersService).to(UsersService);
container.bind<DatabaseServiceInterface>(APP_DI_TYPES.DatabaseService).to(DatabaseService);
container.bind<LoggerServiceInterface>(APP_DI_TYPES.LoggerService).to(LoggerService);
container.bind<ConfigServiceInterface>(APP_DI_TYPES.ConfigService).to(ConfigService);
container.bind<SeedAdminUser>(SeedAdminUser.key).to(SeedAdminUser);

const seedAdmin = container.get<SeedAdminUser>(SeedAdminUser.key);
seedAdmin
  .apply()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(seedAdmin.disconnect);
