import corsMiddleware from '@koa/cors';
import Router from '@koa/router';
import { inject, injectable } from 'inversify';
import Koa from 'koa';
import bodyParserMiddleware from 'koa-bodyparser';
import loggerMiddleware from 'koa-logger';
import { koaSwagger } from 'koa2-swagger-ui';

import { APP_DI_TYPES } from 'app/app.di-types';
import { IHttpService } from 'boundaries/http/http.service.interface';
import { IConfigService } from 'config/config.service.interface';
import { errorHandlerMiddleware, ValidationError } from 'errors';
import { USERS_DI_TYPES } from 'features/users/users.di-types';
import { bind, RoutesConfigType } from 'libs/router';
import { logger } from 'logger';

import { IAuthService } from '../../features/users/services/auth.service.interface';
import { IUsersService } from '../../features/users/services/users.service.interface';
import openapiSpec from '../../openapi.json';

import { IFrameworkService } from './framework.service.interface';

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

  private useMiddlewares(): void {
    this.framework.use(
      loggerMiddleware({
        transporter: (message) => {
          logger.info(message);
        },
      }),
    );
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

  private setupSwagger(): void {
    this.router.get(
      '/docs',
      koaSwagger({
        hideTopbar: true,
        swaggerOptions: { spec: openapiSpec },
      }),
    );
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
