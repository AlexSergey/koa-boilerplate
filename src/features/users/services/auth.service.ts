import { compare } from 'bcrypt';
import { Injectable } from 'friendly-di';
import jsonwebtoken from 'jsonwebtoken';

import { ConfigService } from '../../../config/config.service';
import { UserJwtPayload } from '../types/jwt.interface';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

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

  decodeToken(token: string): UserJwtPayload {
    return jsonwebtoken.verify(token, this.configService.get('SECRET')) as UserJwtPayload;
  }

  async validateToken(userPassword: string, password: string): Promise<boolean> {
    return await compare(password, userPassword);
  }
}
