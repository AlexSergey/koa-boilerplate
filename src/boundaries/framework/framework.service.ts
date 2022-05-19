import Koa from 'koa';
import corsMiddleware from '@koa/cors';
import Router from '@koa/router';
import loggerMiddleware from 'koa-logger';
import bodyParserMiddleware from 'koa-bodyparser';
import { koaSwagger } from 'koa2-swagger-ui';
import { inject, injectable } from 'inversify';

import { ConfigServiceInterface } from 'config/config.service.interface';
import { errorHandlerMiddleware, ValidationError } from 'errors';
import { bind, RoutesConfigType } from 'libs/router';
import { LoggerServiceInterface } from 'logger/logger.service.interface';
import { APP_DI_TYPES } from 'app/app.di-types';
import { USERS_DI_TYPES } from 'features/users/users.di-types';
import { HttpServiceInterface } from 'boundaries/http/http.service.interface';

import { UsersServiceInterface } from '../../features/users/services/users.service.interface';
import { AuthServiceInterface } from '../../features/users/services/auth.service.interface';
import openapiSpec from '../../openapi.json';

import { FrameworkServiceInterface } from './framework.service.interface';

@injectable()
export class FrameworkService implements FrameworkServiceInterface {
  constructor(
    @inject(APP_DI_TYPES.LoggerService) private loggerService: LoggerServiceInterface,
    @inject(APP_DI_TYPES.ConfigService) private configService: ConfigServiceInterface,
    @inject(USERS_DI_TYPES.UsersService) private usersService: UsersServiceInterface,
    @inject(USERS_DI_TYPES.AuthService) private authService: AuthServiceInterface,
    private framework: Koa = new Koa(),
    private router: Router = new Router(),
  ) {}

  private injectContext(): void {
    this.framework.use(async (ctx, next) => {
      ctx.logger = this.loggerService;
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
          this.loggerService.log(message);
        },
      }),
    );
    this.framework.use(errorHandlerMiddleware());
    this.framework.use(
      corsMiddleware(
        this.configService.isDevelopment()
          ? {
              credentials: true,
              origin: '*',
              allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
              allowHeaders: ['Content-Type', 'Authorization'],
              exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
            }
          : {},
      ),
    );
    this.framework.use(
      bodyParserMiddleware({
        onerror: (error, ctx) => {
          this.loggerService.warn('Parsing error', { error, ctx });
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
        swaggerOptions: { spec: openapiSpec },
        hideTopbar: true,
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bind(httpService: HttpServiceInterface, controllers?: any[], routesConfig?: RoutesConfigType): void {
    this.injectContext();
    this.useMiddlewares();
    this.setupSwagger();
    this.useRoutes(controllers, routesConfig);
    const http = httpService.getHttp();

    http.on('request', this.framework.callback());
  }
}
