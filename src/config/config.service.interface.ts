export type EnvType = 'development' | 'production' | 'test';

export interface ConfigServiceInterface {
  get: (key: string) => string;

  getEnv: () => EnvType;

  isDevelopment: () => boolean;

  getJwtExpiresIn: () => string;
}
