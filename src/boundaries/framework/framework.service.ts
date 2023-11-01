import corsMiddleware from '@koa/cors';
import Router from '@koa/router';
import { inject, injectable } from 'inversify';
import Koa from 'koa';
import bodyParserMiddleware from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import loggerMiddleware from 'koa-logger';
import { koaSwagger } from 'koa2-swagger-ui';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { APP_DI_TYPES } from '../../app/app.di-types';
import { IConfigService } from '../../config/config.service.interface';
import { ValidationError, errorHandlerMiddleware } from '../../errors';
import { IAuthService } from '../../features/users/services/auth.service.interface';
import { IUsersService } from '../../features/users/services/users.service.interface';
import { USERS_DI_TYPES } from '../../features/users/users.di-types';
import { RoutesConfigType, bind } from '../../libs/router';
import { logger } from '../../logger';
import { IHttpService } from '../http/http.service.interface';
import { IFrameworkService } from './framework.service.interface';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const openapiSpec = JSON.parse(readFileSync(resolve(__dirname, '../../openapi.json'), 'utf8'));

@injectable()
export class FrameworkService implements IFrameworkService {
  constructor(
    @inject(APP_DI_TYPES.ConfigService) private configService: IConfigService,
    @inject(USERS_DI_TYPES.UsersService) private usersService: IUsersService,
    @inject(USERS_DI_TYPES.AuthService) private authService: IAuthService,
    private framework: Koa = new Koa(),
    private router: Router = new Router(),
  ) {}

  private injectContext(): void {
    this.framework.use(async (ctx, next) => {
      ctx.services = {
        authService: this.authService,
        usersService: this.usersService,
      };
      await next();
    });
  }

  private setupSwagger(): void {
    this.router.get(
      '/docs',
      koaSwagger({
        hideTopbar: true,
        swaggerOptions: { spec: openapiSpec },
      }),
    );
  }

  private useMiddlewares(): void {
    this.framework.use(
      loggerMiddleware({
        transporter: (message) => {
          logger.info(message);
        },
      }),
    );
    this.framework.use(koaHelmet());
    this.framework.use(errorHandlerMiddleware());
    this.framework.use(
      corsMiddleware(
        this.configService.isDevelopment()
          ? {
              allowHeaders: ['Content-Type', 'Authorization'],
              allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
              credentials: true,
              exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
              origin: '*',
            }
          : {},
      ),
    );
    this.framework.use(
      bodyParserMiddleware({
        onerror: (error, ctx) => {
          logger.warn('[bodyParser] Parsing error', { ctx, error });
          const pureError = new ValidationError({
            bodyparser: error.message,
          }).get();
          ctx.status = pureError.statusCode;

          ctx.body = pureError;
        },
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private useRoutes(controllers?: any[], routesConfig?: RoutesConfigType): void {
    if (Array.isArray(controllers)) {
      bind(this.router, controllers, routesConfig);
      this.framework.use(this.router.routes()).use(this.router.allowedMethods());
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bind(httpService: IHttpService, controllers?: any[], routesConfig?: RoutesConfigType): void {
    this.injectContext();
    this.useMiddlewares();
    this.setupSwagger();
    this.useRoutes(controllers, routesConfig);
    const http = httpService.getHttp();

    http.on('request', this.framework.callback());
  }
}
