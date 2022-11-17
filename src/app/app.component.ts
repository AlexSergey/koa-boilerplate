import { injectable, inject } from 'inversify';

import { IFrameworkService } from 'boundaries/framework/framework.service.interface';
import { IHttpService } from 'boundaries/http/http.service.interface';
import { IConfigService } from 'config/config.service.interface';
import { IDatabaseService } from 'database/database.service.interface';
import { IUsersController } from 'features/users/controllers/users.controller.interface';
import { USERS_DI_TYPES } from 'features/users/users.di-types';

import { APP_DI_TYPES } from './app.di-types';

@injectable()
export class AppComponent {
  constructor(
    @inject(APP_DI_TYPES.ConfigService) private configService: IConfigService,
    @inject(APP_DI_TYPES.HttpService) private httpService: IHttpService,
    @inject(APP_DI_TYPES.FrameworkService) private frameworkService: IFrameworkService,
    @inject(APP_DI_TYPES.DatabaseService) private databaseService: IDatabaseService,
    @inject(USERS_DI_TYPES.UsersController) private usersController: IUsersController,
  ) {}

  async start(): Promise<void> {
    this.frameworkService.bind(this.httpService, [this.usersController], {
      prefix: 'api',
    });
    await this.httpService.start();
    await this.databaseService.connect();
  }

  async stop(): Promise<void> {
    await this.httpService.stop();
    await this.databaseService.disconnect();
  }
}
