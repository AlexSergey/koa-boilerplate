import { UserModel } from '@prisma/client';

import { UserLoginDto } from '../dtos/user-login.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';

export interface IUsersService {
  createUser(dto: UserRegisterDto): Promise<UserModel | null>;

  getUserInfo(user: string): Promise<UserModel | null>;

  loginUser(dto: UserLoginDto): Promise<boolean>;
}
