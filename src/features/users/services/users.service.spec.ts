import { jest } from '@jest/globals';
import { UserModel } from '@prisma/client';
import { Container } from 'inversify';

import { APP_DI_TYPES } from '../../../app/app.di-types';
import { IConfigService } from '../../../config/config.service.interface';
import { UserEntity } from '../entities/user.entity';
import { IUsersRepository } from '../repositories/users.repository.interface';
import { USERS_DI_TYPES } from '../users.di-types';
import { UsersService } from './users.service';
import { IUsersService } from './users.service.interface';

const ConfigServiceMock = {
  get: jest.fn(),
  getEnv: jest.fn(),
  getJwtExpiresIn: jest.fn(),
  isDevelopment: jest.fn(),
} as IConfigService;

const UsersRepositoryMock = {
  create: jest.fn(),
  findByEmail: jest.fn(),
} as IUsersRepository;

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUsersService;

beforeAll(() => {
  container.bind<IUsersService>(USERS_DI_TYPES.UsersService).to(UsersService);
  container.bind<IConfigService>(APP_DI_TYPES.ConfigService).toConstantValue(ConfigServiceMock);
  container.bind<IUsersRepository>(USERS_DI_TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

  configService = container.get<IConfigService>(APP_DI_TYPES.ConfigService);
  usersRepository = container.get<IUsersRepository>(USERS_DI_TYPES.UsersRepository);
  usersService = container.get<IUsersService>(USERS_DI_TYPES.UsersService);
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
      // eslint-disable-next-line sonarjs/no-hardcoded-credentials
      password: '123',
    });

    expect(createdUser?.id).toEqual(1);
    expect(createdUser?.email).toEqual('test@mail.com');
    expect(createdUser?.name).toEqual('John');
    expect(createdUser?.password).not.toEqual('123');
  });
});
