import { Container } from 'inversify';
import { UserModel } from '@prisma/client';
import pino from 'pino';

import { APP_DI_TYPES } from 'app/app.di-types';
import { LoggerServiceInterface } from 'logger/logger.service.interface';
import { ConfigServiceInterface } from 'config/config.service.interface';

import { USERS_DI_TYPES } from '../users.di-types';
import { UsersRepositoryInterface } from '../repositories/users.repository.interface';
import { UserEntity } from '../entities/user.entity';

import { UsersServiceInterface } from './users.service.interface';
import { UsersService } from './users.service';

const ConfigServiceMock: ConfigServiceInterface = {
  get: jest.fn(),
  getEnv: jest.fn(),
  isDevelopment: jest.fn(),
  getJwtExpiresIn: jest.fn(),
};

const UsersRepositoryMock: UsersRepositoryInterface = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

const LoggerMock: LoggerServiceInterface = {
  logger: pino(),
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

const container = new Container();
let configService: ConfigServiceInterface;
let usersRepository: UsersRepositoryInterface;
let usersService: UsersServiceInterface;

beforeAll(() => {
  container.bind<UsersServiceInterface>(USERS_DI_TYPES.UsersService).to(UsersService);
  container.bind<LoggerServiceInterface>(APP_DI_TYPES.LoggerService).toConstantValue(LoggerMock);
  container.bind<ConfigServiceInterface>(APP_DI_TYPES.ConfigService).toConstantValue(ConfigServiceMock);
  container.bind<UsersRepositoryInterface>(USERS_DI_TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

  configService = container.get<ConfigServiceInterface>(APP_DI_TYPES.ConfigService);
  usersRepository = container.get<UsersRepositoryInterface>(USERS_DI_TYPES.UsersRepository);
  usersService = container.get<UsersServiceInterface>(USERS_DI_TYPES.UsersService);
});

describe('Users service', () => {
  it('Create user', async () => {
    configService.get = jest.fn().mockReturnValue('1');

    usersRepository.create = jest.fn().mockImplementationOnce(
      (user: UserEntity): UserModel => ({
        id: 1,
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    );

    const createdUser = await usersService.createUser({
      email: 'test@mail.com',
      password: '123',
      name: 'John',
    });

    expect(createdUser?.id).toEqual(1);
    expect(createdUser?.email).toEqual('test@mail.com');
    expect(createdUser?.name).toEqual('John');
    expect(createdUser?.password).not.toEqual('123');
  });
});
