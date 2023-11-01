export type EnvType = 'development' | 'production' | 'test';

export interface IConfigService {
  get: (key: string) => string;

  getEnv: () => EnvType;

  getJwtExpiresIn: () => string;

  isDevelopment: () => boolean;
}
