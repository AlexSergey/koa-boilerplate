import { ContainerModule, interfaces } from 'inversify';

import { FrameworkService } from '../boundaries/framework/framework.service';
import { IFrameworkService } from '../boundaries/framework/framework.service.interface';
import { HttpService } from '../boundaries/http/http.service';
import { IHttpService } from '../boundaries/http/http.service.interface';
import { ConfigService } from '../config/config.service';
import { IConfigService } from '../config/config.service.interface';
import { DatabaseService } from '../database/database.service';
import { IDatabaseService } from '../database/database.service.interface';

import { AppComponent } from './app.component';
import { APP_DI_TYPES } from './app.di-types';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<IConfigService>(APP_DI_TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<IHttpService>(APP_DI_TYPES.HttpService).to(HttpService).inSingletonScope();
  bind<IFrameworkService>(APP_DI_TYPES.FrameworkService).to(FrameworkService);
  bind<IDatabaseService>(APP_DI_TYPES.DatabaseService).to(DatabaseService).inSingletonScope();
  bind<AppComponent>(APP_DI_TYPES.App).to(AppComponent).inSingletonScope();
});
