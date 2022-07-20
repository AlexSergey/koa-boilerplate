import { UserModel } from '@prisma/client';

import { UserEntity } from '../entities/user.entity';

export interface IUsersRepository {
  create(user: UserEntity): Promise<UserModel>;

  findByEmail(email: string): Promise<UserModel | null>;
}
