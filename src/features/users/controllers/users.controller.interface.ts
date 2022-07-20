import { DefaultContext } from 'koa';

export interface IUsersController {
  login(ctx: DefaultContext): Promise<void>;

  register(ctx: DefaultContext): Promise<void>;
}
