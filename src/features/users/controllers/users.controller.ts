import { inject, injectable } from 'inversify';
import { DefaultContext } from 'koa';

import { APP_DI_TYPES } from 'app/app.di-types';
import { Controller, Get, Post } from 'libs/router';
import { LoggerServiceInterface } from 'logger/logger.service.interface';
import { validateMiddleware } from 'middlewares/validate.middleware';
import { UnauthorizedError, UserAlreadyExistsError, UserNotFoundError } from 'errors';
import { ConfigServiceInterface } from 'config/config.service.interface';
import { BaseController } from 'common';

import { UserLoginDto } from '../dtos/user-login.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { USERS_DI_TYPES } from '../users.di-types';
import { UsersServiceInterface } from '../services/users.service.interface';
import { AuthServiceInterface } from '../services/auth.service.interface';
import { authGuard } from '../../../guards/auth.guard';
import { ContextUserInterface } from '../types/context-user.interface';

import { UsersControllerInterface } from './users.controller.interface';

@injectable()
@Controller('users')
export class UsersController extends BaseController implements UsersControllerInterface {
  constructor(
    @inject(APP_DI_TYPES.LoggerService) private loggerService: LoggerServiceInterface,
    @inject(USERS_DI_TYPES.UsersService) private usersService: UsersServiceInterface,
    @inject(APP_DI_TYPES.ConfigService) private configService: ConfigServiceInterface,
    @inject(USERS_DI_TYPES.AuthService) private authService: AuthServiceInterface,
  ) {
    super();
  }

  /**
   * @openapi
   * /users/login:
   *   post:
   *     summary: Login existed user
   *     tags:
   *        - users
   *     requestBody:
   *       description: Required fields for user's login
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: user email (validation field)
   *               password:
   *                 type: string
   *                 description: user password (validation field)
   *     description: User login
   *     responses:
   *       200:
   *         description: Return user JWT.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 code:
   *                   type: integer
   *                   default: 200
   *                   description: Ok code
   *                 status:
   *                   type: integer
   *                   default: 200
   *                   description: Ok status
   *                 statusCode:
   *                   type: integer
   *                   default: 200
   *                   description: Ok statusCode
   *                 message:
   *                   type: string
   *                   default: "ok"
   *                   description: Ok message
   *                 data:
   *                   type: object
   *                   properties:
   *                     jwt:
   *                       type: string
   *                       description: User JSON web token
   *       401:
   *         $ref: '#/components/errors/unauthorized'
   */
  @Post('/login', validateMiddleware(UserLoginDto))
  async login(ctx: DefaultContext): Promise<void> {
    const data = ctx.request.body as UserLoginDto;
    const result = await this.usersService.loginUser(data);
    if (!result) {
      throw new UnauthorizedError();
    }
    const jwt = await this.authService.createToken(data.email);
    this.ok(ctx, 'User is logged in', { jwt });
  }

  @Post('/register', validateMiddleware(UserRegisterDto))
  async register(ctx: DefaultContext): Promise<void> {
    const data = ctx.request.body as UserRegisterDto;
    const result = await this.usersService.createUser(data);
    if (!result) {
      throw new UserAlreadyExistsError();
    }
    this.ok(ctx, 'User created', {
      id: result.id,
      email: result.email,
    });
  }

  @Get('/info', authGuard)
  async info(ctx: ContextUserInterface): Promise<void> {
    const existedUser = await this.usersService.getUserInfo(ctx.user.email);
    if (!existedUser) {
      throw new UserNotFoundError();
    }
    this.ok(ctx, 'User found', {
      email: existedUser.email,
      name: existedUser.name,
      id: existedUser.id,
    });
  }
}
