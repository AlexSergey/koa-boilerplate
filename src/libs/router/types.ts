import { DefaultContext, DefaultState, Middleware, Next } from 'koa';

import { METHODS } from './methods';

export type RouteType<StateT = DefaultState, ContextT = DefaultContext> = {
  url: string;
  method: METHODS;
  callback: (ctx: DefaultContext, next?: Next) => Promise<void>;
  middlewares?: Middleware<StateT, ContextT> | Middleware<StateT, ContextT>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controller?: any;
  matched?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx?: any;
};

export type RoutesConfigType = {
  prefix?: string;
  version?: string;
};
