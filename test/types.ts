import { Test } from 'supertest';

export type SuperTestAgent = SuperTest<Test>;

interface SuperTest<T> {
  delete: (url: string) => T;
  get: (url: string) => T;
  post: (url: string) => T;
  put: (url: string) => T;
}
