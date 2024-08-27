import { Container } from 'inversify';
import 'reflect-metadata';

import { AppComponent } from './app/app.component';
import { appDiContainer } from './app/app.di-container';
import { APP_DI_TYPES } from './app/app.di-types';

export interface IBootstrapReturnType {
  app: AppComponent;
  appDiContainer: Container;
}

const bootstrap = async (): Promise<IBootstrapReturnType> => {
  const app = appDiContainer.get<AppComponent>(APP_DI_TYPES.App);
  await app.start();

  return { app, appDiContainer };
};

export const boot = bootstrap();
