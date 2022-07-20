import { UserModel } from '@prisma/client';
import { DefaultContext } from 'koa';

export interface IContextUser extends DefaultContext {
  user: UserModel;
}
