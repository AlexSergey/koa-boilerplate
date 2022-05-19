import { createServer, Server } from 'http';

import enableDestroy from 'server-destroy';
import { injectable, inject } from 'inversify';

import { ConfigServiceInterface } from 'config/config.service.interface';
import { LoggerServiceInterface } from 'logger/logger.service.interface';
import { APP_DI_TYPES } from 'app/app.di-types';

import { HttpServiceInterface } from './http.service.interface';

@injectable()
export class HttpService implements HttpServiceInterface {
  http: Server = createServer();

  constructor(
    @inject(APP_DI_TYPES.LoggerService) private loggerService: LoggerServiceInterface,
    @inject(APP_DI_TYPES.ConfigService) private configService: ConfigServiceInterface,
  ) {}

  getHttp(): Server {
    return this.http;
  }

  async start(): Promise<void> {
    if (this.http.listening) throw new Error('HTTP Server is already listening');
    const port = this.configService.get('PORT');
    const serverListenPromise = new Promise<void>((resolve, reject) => {
      this.http.listen(port, resolve);
      this.http.once('error', reject);
    });

    await serverListenPromise;
    this.loggerService.log(`HTTP server started on ${port}`);
  }

  async stop(): Promise<void> {
    if (!this.http.listening) throw new Error('HTTP Server is not listening');
    enableDestroy(this.http);

    return new Promise<void>((resolve, reject) => {
      this.http.destroy((err) => {
        if (err instanceof Error) {
          this.loggerService.error(`HTTP Server stopped error: ${err.message}`);
          return reject();
        }
        this.loggerService.log('HTTP Server stopped');
        return resolve();
      });
    });
  }
}
