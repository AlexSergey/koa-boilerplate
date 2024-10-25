import { UserModel } from '@prisma/client';
import { DefaultContext } from 'koa';

export interface ContextUser extends DefaultContext {
  user: UserModel;
}
