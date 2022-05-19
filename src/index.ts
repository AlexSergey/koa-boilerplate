import 'reflect-metadata';
import { Container } from 'inversify';

import { AppComponent } from 'app/app.component';
import { APP_DI_TYPES } from 'app/app.di-types';
import { appDiContainer } from 'app/app.di-container';

export type BootstrapReturnType = {
  app: AppComponent;
  appDiContainer: Container;
};

const bootstrap = async (): Promise<BootstrapReturnType> => {
  const app = appDiContainer.get<AppComponent>(APP_DI_TYPES.App);
  await app.start();
  return { app, appDiContainer };
};

export const boot = bootstrap();
