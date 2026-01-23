import { Injectable } from 'friendly-di';

import { UserModel } from '../../../../prisma/generated';
import { DatabaseService } from '../../../database/database.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private databaseService: DatabaseService) {}

  async create({ email, name, password }: UserEntity): Promise<UserModel> {
    return this.databaseService.userModel.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async findByEmail(email: string): Promise<null | UserModel> {
    return this.databaseService.userModel.findFirst({
      where: {
        email,
      },
    });
  }
}
