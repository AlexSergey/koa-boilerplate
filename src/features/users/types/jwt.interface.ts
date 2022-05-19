import { JwtPayload } from 'jsonwebtoken';

export interface UserJWTPayloadInterface extends JwtPayload {
  email: string;
}
