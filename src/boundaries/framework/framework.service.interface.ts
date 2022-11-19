import { RoutesConfigType } from '../../libs/router';
import { IHttpService } from '../http/http.service.interface';

export interface IFrameworkService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bind: (httpService: IHttpService, controllers?: any[], routesConfig?: RoutesConfigType) => void;
}
