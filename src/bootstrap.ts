import { Container } from 'friendly-di';

import { AppComponent } from './app/app.component';

export interface BootstrapReturnType {
  app: AppComponent;
  appDiContainer: Container<typeof AppComponent>;
}

export const bootstrap = async (): Promise<BootstrapReturnType> => {
  const appDiContainer = new Container(AppComponent);
  const app = appDiContainer.compile();
  await app.start();

  return { app, appDiContainer };
};
