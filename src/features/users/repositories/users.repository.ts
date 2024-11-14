import { UserModel } from '@prisma/client';
import { Injectable } from 'friendly-di';

import { DatabaseService } from '../../../database/database.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private databaseService: DatabaseService) {}

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
