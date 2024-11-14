import { Injectable } from 'friendly-di';
import { createServer, Server } from 'node:http';
import enableDestroy from 'server-destroy';

import { ConfigService } from '../../config/config.service';
import { logger } from '../../logger';

@Injectable()
export class HttpService {
  http: Server = createServer();

  constructor(private configService: ConfigService) {}

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
    logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
  }

  async stop(): Promise<void> {
    if (!this.http.listening) throw new Error('HTTP Server is not listening');
    enableDestroy(this.http);

    return new Promise<void>((resolve, reject) => {
      this.http.destroy((err) => {
        if (err instanceof Error) {
          logger.error(`HTTP Server stopped error: ${err.message}`);

          return reject();
        }
        logger.info('HTTP Server stopped');

        return resolve();
      });
    });
  }
}
