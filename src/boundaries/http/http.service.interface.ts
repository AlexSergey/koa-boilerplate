import { Server } from 'http';

export interface HttpServiceInterface {
  start: () => void;
  stop: () => void;
  getHttp: () => Server;
}
