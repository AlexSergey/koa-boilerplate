import { plainToInstance } from 'class-transformer';
import { Container, Injectable } from 'friendly-di';
import 'reflect-metadata';

import { ConfigService } from '../src/config/config.service';
import { DatabaseService } from '../src/database/database.service';
import { UserRegisterDto } from '../src/features/users/dtos/user-register.dto';
import { UsersService } from '../src/features/users/services/users.service';
import { logger } from '../src/logger';

@Injectable()
class SeedAdminUser {
  constructor(
    private configService: ConfigService,
    private databaseService: DatabaseService,
    private usersService: UsersService,
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
    logger.info(`Admin user for ${this.configService.getEnv()} environment was created`);
  };

  disconnect = async (): Promise<void> => {
    await this.databaseService.disconnect();
  };
}

const seedAdmin = new Container(SeedAdminUser).compile();
seedAdmin
  .apply()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.log(e);

    process.exit(1);
  })
  .finally(seedAdmin.disconnect);
