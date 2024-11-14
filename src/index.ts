import { Container } from 'friendly-di';
import 'reflect-metadata';

import { AppComponent } from './app/app.component';

export interface BootstrapReturnType {
  app: AppComponent;
  appDiContainer: Container<typeof AppComponent>;
}

const bootstrap = async (): Promise<BootstrapReturnType> => {
  const appDiContainer = new Container(AppComponent);
  const app = appDiContainer.compile();
  await app.start();

  return { app, appDiContainer };
};

export const boot = bootstrap();
