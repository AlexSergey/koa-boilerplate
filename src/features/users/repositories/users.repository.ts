import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { APP_DI_TYPES } from '../../../app/app.di-types';
import { IDatabaseService } from '../../../database/database.service.interface';
import { UserEntity } from '../entities/user.entity';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@inject(APP_DI_TYPES.DatabaseService) private databaseService: IDatabaseService) {}

  async create({ email, name, password }: UserEntity): Promise<UserModel> {
    return this.databaseService.client.userModel.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async findByEmail(email: string): Promise<null | UserModel> {
    return this.databaseService.client.userModel.findFirst({
      where: {
        email,
      },
    });
  }
}
