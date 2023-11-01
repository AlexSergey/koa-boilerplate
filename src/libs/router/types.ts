import { DefaultContext, DefaultState, Middleware, Next } from 'koa';

import { METHODS } from './methods';

export type RouteType<StateT = DefaultState, ContextT = DefaultContext> = {
  callback: (ctx: DefaultContext, next?: Next) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controller?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx?: any;
  matched?: boolean;
  method: METHODS;
  middlewares?: Middleware<StateT, ContextT> | Middleware<StateT, ContextT>[];
  url: string;
};

export type RoutesConfigType = {
  prefix?: string;
  version?: string;
};
