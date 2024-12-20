import { Injectable } from 'friendly-di';
import { DefaultContext } from 'koa';

import { BaseController } from '../../../common';
import { UnauthorizedError, UserAlreadyExistsError, UserNotFoundError } from '../../../errors';
import { authGuard } from '../../../guards/auth.guard';
import { Controller, Get, Post } from '../../../libs/router';
import { validateMiddleware } from '../../../middlewares/validate.middleware';
import { UserLoginDto } from '../dtos/user-login.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { ContextUser } from '../types/context-user.interface';

@Controller('users')
@Injectable()
export class UsersController extends BaseController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {
    super();
  }

  @Get('/info', authGuard)
  async info(ctx: ContextUser): Promise<void> {
    const existedUser = await this.usersService.getUserInfo(ctx.user.email);
    if (!existedUser) {
      throw new UserNotFoundError();
    }
    this.ok(ctx, 'User found', {
      email: existedUser.email,
      id: existedUser.id,
      name: existedUser.name,
    });
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
      email: result.email,
      id: result.id,
    });
  }
}
