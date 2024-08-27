import { IRouteType } from './types';

export class RouterStore {
  private static instance: RouterStore;

  private routes: IRouteType[] = [];

  public static getInstance(): RouterStore {
    if (!RouterStore.instance) {
      RouterStore.instance = new RouterStore();
    }

    return RouterStore.instance;
  }

  public get(): IRouteType[] {
    return this.routes;
  }

  public set(route: IRouteType): void {
    const existed = this.routes.find((r) => r.url === route.url && r.method === route.method);
    if (existed) {
      // eslint-disable-next-line no-console
      console.log(`Route ${existed.url} for method ${existed.method} has already existed`);

      return;
    }
    this.routes.push(route);
  }
}
