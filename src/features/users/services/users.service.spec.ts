import { jest } from '@jest/globals';
import { UserModel } from '@prisma/client';
import { Container } from 'inversify';

import { APP_DI_TYPES } from '../../../app/app.di-types';
import { ConfigServiceInterface } from '../../../config/config.service.interface';
import { UserEntity } from '../entities/user.entity';
import { UsersRepositoryInterface } from '../repositories/users.repository.interface';
import { USERS_DI_TYPES } from '../users.di-types';
import { UsersService } from './users.service';
import { UsersServiceInterface } from './users.service.interface';

const ConfigServiceMock = {
  get: jest.fn(),
  getEnv: jest.fn(),
  getJwtExpiresIn: jest.fn(),
  isDevelopment: jest.fn(),
} as ConfigServiceInterface;

const UsersRepositoryMock = {
  create: jest.fn(),
  findByEmail: jest.fn(),
} as UsersRepositoryInterface;

const container = new Container();
let configService: ConfigServiceInterface;
let usersRepository: UsersRepositoryInterface;
let usersService: UsersServiceInterface;

beforeAll(() => {
  container.bind<UsersServiceInterface>(USERS_DI_TYPES.UsersService).to(UsersService);
  container.bind<ConfigServiceInterface>(APP_DI_TYPES.ConfigService).toConstantValue(ConfigServiceMock);
  container.bind<UsersRepositoryInterface>(USERS_DI_TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

  configService = container.get<ConfigServiceInterface>(APP_DI_TYPES.ConfigService);
  usersRepository = container.get<UsersRepositoryInterface>(USERS_DI_TYPES.UsersRepository);
  usersService = container.get<UsersServiceInterface>(USERS_DI_TYPES.UsersService);
});

describe('Users service', () => {
  it('Create user', async () => {
    configService.get = jest.fn().mockReturnValue('1') as (key: string) => string;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    usersRepository.create = jest.fn().mockImplementationOnce(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (user: UserEntity): UserModel => ({
        email: user.email,
        id: 1,
        name: user.name,
        password: user.password,
      }),
    );

    const createdUser = await usersService.createUser({
      email: 'test@mail.com',
      name: 'John',
      password: '123',
    });

    expect(createdUser?.id).toEqual(1);
    expect(createdUser?.email).toEqual('test@mail.com');
    expect(createdUser?.name).toEqual('John');
    expect(createdUser?.password).not.toEqual('123');
  });
});
