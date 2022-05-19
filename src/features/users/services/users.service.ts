import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { APP_DI_TYPES } from 'app/app.di-types';
import { ConfigServiceInterface } from 'config/config.service.interface';
import { LoggerServiceInterface } from 'logger/logger.service.interface';

import { USERS_DI_TYPES } from '../users.di-types';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { UserEntity } from '../entities/user.entity';
import { UserLoginDto } from '../dtos/user-login.dto';
import { UsersRepositoryInterface } from '../repositories/users.repository.interface';

import { UsersServiceInterface } from './users.service.interface';

@injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @inject(APP_DI_TYPES.LoggerService) private loggerService: LoggerServiceInterface,
    @inject(APP_DI_TYPES.ConfigService) private configService: ConfigServiceInterface,
    @inject(USERS_DI_TYPES.UsersRepository) private usersRepository: UsersRepositoryInterface,
  ) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
    const newUser = new UserEntity(email, name);
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));
    const existedUser = await this.usersRepository.findByEmail(email);
    if (existedUser) {
      this.loggerService.error(`User with email: ${email} is already existed`);
      return null;
    }
    return await this.usersRepository.create(newUser);
  }

  async loginUser({ email, password }: UserLoginDto): Promise<boolean> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      this.loggerService.error(`User not found`);
      return false;
    }
    const userEntity = new UserEntity(user.email, user.name, user.password);
    return await userEntity.comparePassword(password);
  }

  async getUserInfo(email: string): Promise<UserModel | null> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      this.loggerService.error(`User not found`);
      return null;
    }
    return user;
  }
}
