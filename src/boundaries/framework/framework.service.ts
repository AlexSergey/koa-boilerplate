import corsMiddleware from '@koa/cors';
import Router from '@koa/router';
import { Injectable } from 'friendly-di';
import Koa from 'koa';
import { koaSwagger } from 'koa2-swagger-ui';
import bodyParserMiddleware from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import loggerMiddleware from 'koa-logger';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ConfigService } from '../../config/config.service';
import { errorHandlerMiddleware, ValidationError } from '../../errors';
import { AuthService } from '../../features/users/services/auth.service';
import { UsersService } from '../../features/users/services/users.service';
import { bind, RoutesConfigType } from '../../libs/router';
import { logger } from '../../logger';
import { HttpService } from '../http/http.service';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const openapiSpec = JSON.parse(readFileSync(resolve(__dirname, '../../openapi.json'), 'utf8'));

@Injectable()
export class FrameworkService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private authService: AuthService,
    private framework: Koa = new Koa(),
    private router: Router = new Router(),
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bind(httpService: HttpService, controllers?: any[], routesConfig?: RoutesConfigType): void {
    this.injectContext();
    this.useMiddlewares();
    this.setupSwagger();
    this.useRoutes(controllers, routesConfig);
    const http = httpService.getHttp();

    http.on('request', this.framework.callback());
  }

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
}
