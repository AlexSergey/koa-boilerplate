import { DefaultContext } from 'koa';

export interface UsersControllerInterface {
  login(ctx: DefaultContext): Promise<void>;

  register(ctx: DefaultContext): Promise<void>;
}
