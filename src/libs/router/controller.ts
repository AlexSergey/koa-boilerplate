import { Middleware } from 'koa';
import urlJoin from 'proper-url-join';

import { ROUTE_METADATA_KEY } from './constants';
import { RouterStore } from './router.store';
import { IRouteType } from './types';

export const Controller = (url?: string, middlewares?: Middleware | Middleware[]) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  return (constructor: Function): void => {
    const routes: IRouteType[] = Reflect.getMetadata(ROUTE_METADATA_KEY, constructor.prototype);
    const routerStore = RouterStore.getInstance();

    routes.forEach((route) => {
      const routeExistedMiddlewares = Array.isArray(route.middlewares) ? route.middlewares : [route.middlewares];
      const controllerExistedMiddlewares = Array.isArray(middlewares) ? middlewares : [middlewares];

      const mixedMiddlewares = [...controllerExistedMiddlewares, ...routeExistedMiddlewares];
      const finalMiddlewares = mixedMiddlewares.filter((middleware) => typeof middleware === 'function');

      const options: IRouteType = {
        callback: route.callback,
        controller: constructor,
        method: route.method,
        url: urlJoin(url, route.url),
      };

      if (finalMiddlewares.length > 0) {
        options.middlewares = finalMiddlewares as Middleware[];
      }

      routerStore.set(options);
    });
  };
};
