import { Server } from 'node:http';

export interface HttpServiceInterface {
  getHttp: () => Server;
  start: () => Promise<void>;
  stop: () => Promise<void>;
}
