import { IHttpService } from 'boundaries/http/http.service.interface';
import { RoutesConfigType } from 'libs/router';

export interface IFrameworkService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bind: (httpService: IHttpService, controllers?: any[], routesConfig?: RoutesConfigType) => void;
}
