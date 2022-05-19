import { ContainerModule, interfaces } from 'inversify';

import { HttpService } from 'boundaries/http/http.service';
import { HttpServiceInterface } from 'boundaries/http/http.service.interface';
import { FrameworkService } from 'boundaries/framework/framework.service';
import { FrameworkServiceInterface } from 'boundaries/framework/framework.service.interface';
import { ConfigService } from 'config/config.service';
import { ConfigServiceInterface } from 'config/config.service.interface';
import { DatabaseService } from 'database/database.service';
import { DatabaseServiceInterface } from 'database/database.service.interface';
import { LoggerService } from 'logger/logger.service';
import { LoggerServiceInterface } from 'logger/logger.service.interface';

import { APP_DI_TYPES } from './app.di-types';
import { AppComponent } from './app.component';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<LoggerServiceInterface>(APP_DI_TYPES.LoggerService).to(LoggerService).inSingletonScope();
  bind<ConfigServiceInterface>(APP_DI_TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<HttpServiceInterface>(APP_DI_TYPES.HttpService).to(HttpService).inSingletonScope();
  bind<FrameworkServiceInterface>(APP_DI_TYPES.FrameworkService).to(FrameworkService);
  bind<DatabaseServiceInterface>(APP_DI_TYPES.DatabaseService).to(DatabaseService).inSingletonScope();
  bind<AppComponent>(APP_DI_TYPES.App).to(AppComponent).inSingletonScope();
});
