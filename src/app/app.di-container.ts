import { Container } from 'inversify';

import { usersBindings } from '../features/users/di-bindings';

import { appBindings } from './app.di-bindings';

export const appDiContainer = new Container();
appDiContainer.load(appBindings, usersBindings);
