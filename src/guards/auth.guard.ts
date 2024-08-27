import { DefaultState, Middleware } from 'koa';

import { ExpiredTokenError, UnauthorizedError, UserNotFoundError } from '../errors';
import { IContextUser } from '../features/users/types/context-user.interface';

export const authGuard: Middleware<DefaultState, IContextUser> = async (ctx, next) => {
  const token = ctx.get('Authorization');

  if (!token) {
    throw new UnauthorizedError();
  }

  let currentUser;

  try {
    const pureToken = token.replace('Bearer ', '');
    currentUser = ctx.services.authService.decodeToken(pureToken);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    throw new ExpiredTokenError();
  }

  if (!currentUser.email) {
    throw new UnauthorizedError();
  }

  const user = await ctx.services.usersService.getUserInfo(currentUser.email);

  if (!user) {
    throw new UserNotFoundError();
  }

  ctx.user = user;

  await next();
};
