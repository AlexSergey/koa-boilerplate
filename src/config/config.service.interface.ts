export type EnvType = 'development' | 'production' | 'test';

export interface ConfigServiceInterface {
  get: (key: string) => string;

  getEnv: () => EnvType;

  getJwtExpiresIn: () => string;

  isDevelopment: () => boolean;
}
