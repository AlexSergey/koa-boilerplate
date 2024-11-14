import { UserModel } from '@prisma/client';
import { Injectable } from 'friendly-di';

import { ConfigService } from '../../../config/config.service';
import { UserLoginDto } from '../dtos/user-login.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { UserEntity } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private usersRepository: UsersRepository,
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
