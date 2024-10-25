import { RoutesConfigType } from '../../libs/router';
import { HttpServiceInterface } from '../http/http.service.interface';

export interface FrameworkServiceInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bind: (httpService: HttpServiceInterface, controllers?: any[], routesConfig?: RoutesConfigType) => void;
}
