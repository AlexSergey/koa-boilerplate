import { Server } from 'node:http';

export interface IHttpService {
  getHttp: () => Server;
  start: () => void;
  stop: () => void;
}
