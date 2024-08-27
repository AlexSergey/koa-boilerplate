import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { APP_DI_TYPES } from '../../../app/app.di-types';
import { IConfigService } from '../../../config/config.service.interface';
import { UserLoginDto } from '../dtos/user-login.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { UserEntity } from '../entities/user.entity';
import { IUsersRepository } from '../repositories/users.repository.interface';
import { USERS_DI_TYPES } from '../users.di-types';
import { IUsersService } from './users.service.interface';

@injectable()
export class UsersService implements IUsersService {
  constructor(
    @inject(APP_DI_TYPES.ConfigService) private configService: IConfigService,
    @inject(USERS_DI_TYPES.UsersRepository) private usersRepository: IUsersRepository,
  ) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<null | UserModel> {
    const newUser = new UserEntity(email, name);
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));
    const existedUser = await this.usersRepository.findByEmail(email);

    if (existedUser) {
      return null;
    }

    return await this.usersRepository.create(newUser);
  }

  async getUserInfo(email: string): Promise<null | UserModel> {
    return await this.usersRepository.findByEmail(email);
  }

  async loginUser({ email, password }: UserLoginDto): Promise<boolean> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      return false;
    }
    const userEntity = new UserEntity(user.email, user.name, user.password);

    return await userEntity.comparePassword(password);
  }
}
