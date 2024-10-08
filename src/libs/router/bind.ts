import Router from '@koa/router';
import urlJoin from 'proper-url-join';

import { RouterStore } from './router.store';
import { IRoutesConfigType } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bind = (router: Router, controllers: any[], config?: IRoutesConfigType): void => {
  const routerStore = RouterStore.getInstance();
  const routes = routerStore.get();

  routes.forEach((route) => {
    const matched = controllers.find((c) => c instanceof route.controller);
    if (matched) {
      route.matched = true;
      route.ctx = matched;
    }
  });

  routes.forEach((route) => {
    if (!route.matched) {
      // eslint-disable-next-line no-console
      console.warn(
        `The controller ${route.controller.name} didn't matched to route. Controller instance should be passed to bind function`,
      );
    }
  });

  routes.forEach((route) => {
    if (route.matched) {
      const finalUrl = urlJoin(config?.prefix, config?.version, route.url);
      const middlewares = Array.isArray(route.middlewares) ? route.middlewares : [];
      router[route.method](finalUrl, ...middlewares, route.callback.bind(route.ctx));
    }
  });
};
