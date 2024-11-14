import { Injectable } from 'friendly-di';

import { FrameworkService } from '../boundaries/framework/framework.service';
import { HttpService } from '../boundaries/http/http.service';
import { DatabaseService } from '../database/database.service';
import { UsersController } from '../features/users/controllers/users.controller';

@Injectable()
export class AppComponent {
  constructor(
    private httpService: HttpService,
    private frameworkService: FrameworkService,
    private databaseService: DatabaseService,
    private usersController: UsersController,
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
