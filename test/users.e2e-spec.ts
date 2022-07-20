import supertest from 'supertest';

import { APP_DI_TYPES, AppComponent } from 'app';

import { boot } from '../src';
import { IHttpService } from '../src/boundaries/http/http.service.interface';

let application: AppComponent;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  const { app, appDiContainer } = await boot;
  const server = appDiContainer.get<IHttpService>(APP_DI_TYPES.HttpService).getHttp();
  request = supertest(server);
  application = app;
});

describe('Users e2e', () => {
  it('Create a user', async () => {
    const res = await request.post('/api/users/register').send({
      email: 'test_user@test.com',
      name: 'test_user',
      password: 'test_user_password',
    });
    expect(res.statusCode).toBe(200);
  });

  it('Short password', async () => {
    const res = await request.post('/api/users/register').send({
      email: 'test_user2@test.com',
      name: 'test_user2',
      password: '123',
    });
    expect(res.body.data.password).toBe('Password is too short. Minimal length is 5 characters, but actual is 123');
  });
});

afterAll(async () => {
  await application.stop();
});
