import { UserModel } from '@prisma/client';

import { UserRegisterDto } from '../dtos/user-register.dto';
import { UserLoginDto } from '../dtos/user-login.dto';

export interface UsersServiceInterface {
  createUser(dto: UserRegisterDto): Promise<UserModel | null>;

  loginUser(dto: UserLoginDto): Promise<boolean>;

  getUserInfo(user: string): Promise<UserModel | null>;
}
