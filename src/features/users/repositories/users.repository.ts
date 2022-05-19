import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { APP_DI_TYPES } from 'app/app.di-types';
import { DatabaseServiceInterface } from 'database/database.service.interface';

import { UserEntity } from '../entities/user.entity';

import { UsersRepositoryInterface } from './users.repository.interface';

@injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(@inject(APP_DI_TYPES.DatabaseService) private databaseService: DatabaseServiceInterface) {}

  async create({ email, password, name }: UserEntity): Promise<UserModel> {
    return this.databaseService.client.userModel.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.databaseService.client.userModel.findFirst({
      where: {
        email,
      },
    });
  }
}
