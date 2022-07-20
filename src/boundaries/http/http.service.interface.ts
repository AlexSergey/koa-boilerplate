import { Server } from 'node:http';

export interface IHttpService {
  start: () => void;
  stop: () => void;
  getHttp: () => Server;
}
