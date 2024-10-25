import { UserJwtPayload } from '../types/jwt.interface';

export interface AuthServiceInterface {
  createToken: (email: string) => Promise<string>;

  decodeToken: (token: string) => UserJwtPayload;

  validateToken: (userPassword: string, password: string) => Promise<boolean>;
}
