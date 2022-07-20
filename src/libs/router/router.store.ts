import { RouteType } from './types';

export class RouterStore {
  private static instance: RouterStore;

  private routes: RouteType[] = [];

  public static getInstance(): RouterStore {
    if (!RouterStore.instance) {
      RouterStore.instance = new RouterStore();
    }

    return RouterStore.instance;
  }

  public set(route: RouteType): void {
    const existed = this.routes.find((r) => r.url === route.url && r.method === route.method);
    if (existed) {
      // eslint-disable-next-line no-console
      console.log(`Route ${existed.url} for method ${existed.method} has already existed`);

      return;
    }
    this.routes.push(route);
  }

  public get(): RouteType[] {
    return this.routes;
  }
}
