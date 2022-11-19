import { compare } from 'bcrypt';
import { inject, injectable } from 'inversify';
import jsonwebtoken from 'jsonwebtoken';

import { APP_DI_TYPES } from '../../../app/app.di-types';
import { IConfigService } from '../../../config/config.service.interface';
import { IUserJwtPayload } from '../types/jwt.interface';

import { IAuthService } from './auth.service.interface';

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject(APP_DI_TYPES.ConfigService) private configService: IConfigService) {}

  createToken(email: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jsonwebtoken.sign(
        {
          email,
          iat: Math.floor(Date.now()),
        },
        this.configService.get('SECRET'),
        {
          algorithm: 'HS256',
          expiresIn: this.configService.getJwtExpiresIn(),
        },
        (err, token) => {
          if (err instanceof Error) {
            return reject(err);
          }

          return resolve(token as string);
        },
      );
    });
  }

  decodeToken(token: string): IUserJwtPayload {
    return jsonwebtoken.verify(token, this.configService.get('SECRET')) as IUserJwtPayload;
  }

  async validateToken(userPassword: string, password: string): Promise<boolean> {
    return await compare(password, userPassword);
  }
}
