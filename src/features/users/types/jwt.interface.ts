import { JwtPayload } from 'jsonwebtoken';

export interface IUserJwtPayload extends JwtPayload {
  email: string;
}
