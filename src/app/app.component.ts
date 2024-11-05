import { inject, injectable } from 'inversify';

import { FrameworkServiceInterface } from '../boundaries/framework/framework.service.interface';
import { HttpServiceInterface } from '../boundaries/http/http.service.interface';
import { DatabaseServiceInterface } from '../database/database.service.interface';
import { UsersControllerInterface } from '../features/users/controllers/users.controller.interface';
import { USERS_DI_TYPES } from '../features/users/users.di-types';
import { APP_DI_TYPES } from './app.di-types';

@injectable()
export class AppComponent {
  constructor(
    @inject(APP_DI_TYPES.HttpService) private httpService: HttpServiceInterface,
    @inject(APP_DI_TYPES.FrameworkService) private frameworkService: FrameworkServiceInterface,
    @inject(APP_DI_TYPES.DatabaseService) private databaseService: DatabaseServiceInterface,
    @inject(USERS_DI_TYPES.UsersController) private usersController: UsersControllerInterface,
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
