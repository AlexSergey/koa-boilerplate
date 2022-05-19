import { UserJWTPayloadInterface } from '../types/jwt.interface';

export interface AuthServiceInterface {
  createToken: (email: string) => Promise<string>;

  decodeToken: (token: string) => UserJWTPayloadInterface;

  validateToken: (userPassword: string, password: string) => Promise<boolean>;
}
