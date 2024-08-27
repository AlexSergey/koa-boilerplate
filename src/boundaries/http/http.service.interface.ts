import { Server } from 'node:http';

export interface IHttpService {
  getHttp: () => Server;
  start: () => Promise<void>;
  stop: () => Promise<void>;
}
