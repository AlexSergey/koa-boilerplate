import { DefaultContext, DefaultState, Middleware } from 'koa';

import { METHODS } from './methods';
import { RouteType } from './types';
import { ROUTE_METADATA_KEY } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DecoratorType = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;

const factory =
  (method: METHODS) =>
  <StateT = DefaultState, ContextT = DefaultContext>(
    url?: string,
    ...middlewares: Middleware<StateT, ContextT>[]
  ): DecoratorType => {
    return function decorator(target, propertyKey, descriptor) {
      const routeUrl = typeof url === 'string' ? url : '/';
      const route: RouteType<StateT, ContextT>[] = Reflect.getOwnMetadata(ROUTE_METADATA_KEY, target) || [];
      const callback = descriptor.value;
      const options: RouteType<StateT, ContextT> = {
        url: routeUrl,
        method,
        callback,
      };
      if (middlewares.length > 0) {
        options.middlewares = middlewares;
      }
      route.push(options);
      Reflect.defineMetadata(ROUTE_METADATA_KEY, route, target);
    };
  };

export const Get = factory(METHODS.GET);

export const Post = factory(METHODS.POST);

export const Put = factory(METHODS.PUT);

export const Delete = factory(METHODS.DELETE);

export const All = factory(METHODS.ALL);
