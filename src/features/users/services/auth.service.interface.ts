import { IUserJwtPayload } from '../types/jwt.interface';

export interface IAuthService {
  createToken: (email: string) => Promise<string>;

  decodeToken: (token: string) => IUserJwtPayload;

  validateToken: (userPassword: string, password: string) => Promise<boolean>;
}
