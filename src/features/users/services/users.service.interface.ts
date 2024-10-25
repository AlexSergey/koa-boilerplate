import { UserModel } from '@prisma/client';

import { UserLoginDto } from '../dtos/user-login.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';

export interface UsersServiceInterface {
  createUser(dto: UserRegisterDto): Promise<null | UserModel>;

  getUserInfo(user: string): Promise<null | UserModel>;

  loginUser(dto: UserLoginDto): Promise<boolean>;
}
