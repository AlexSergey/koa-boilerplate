import { DefaultContext } from 'koa';
import { UserModel } from '@prisma/client';

export interface ContextUserInterface extends DefaultContext {
  user: UserModel;
}
