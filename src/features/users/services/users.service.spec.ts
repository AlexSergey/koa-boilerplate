import { jest } from '@jest/globals';
import { UserModel } from '@prisma/client';
import { Container, Injectable } from 'friendly-di';

import { ConfigService } from '../../../config/config.service';
import { UserEntity } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { UsersService } from './users.service';

@Injectable()
class ConfigServiceMock extends ConfigService {
  override get = jest.fn().mockReturnValue('1') as (key: string) => string;
}

@Injectable()
class UsersRepositoryMock extends UsersRepository {
  override findByEmail = jest.fn().mockReturnValue(null) as (email: string) => Promise<UserModel>;
  override create = async (user: UserEntity): Promise<UserModel> => {
    return {
      email: user.email,
      id: 1,
      name: user.name,
      password: user.password,
    };
  };
}

const container = new Container(UsersService)
  .replace(ConfigService, ConfigServiceMock)
  .replace(UsersRepository, UsersRepositoryMock);
const usersService = container.compile();

describe('Users service', () => {
  it('Create user', async () => {
    const createdUser = await usersService.createUser({
      email: 'test_new@mail.com',
      name: 'John',
      password: '123',
    });

    expect(createdUser?.id).toEqual(1);
    expect(createdUser?.email).toEqual('test_new@mail.com');
    expect(createdUser?.name).toEqual('John');
    expect(createdUser?.password).not.toEqual('123');
  });
});
