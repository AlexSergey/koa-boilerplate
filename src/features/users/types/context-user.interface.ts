import { DefaultContext } from 'koa';

import { UserModel } from '../../../../prisma/generated';

export interface ContextUser extends DefaultContext {
  user: UserModel;
}
