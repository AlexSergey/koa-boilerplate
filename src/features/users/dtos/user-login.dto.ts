import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmail({}, { message: 'Email is not correct' })
  email: string;

  @IsString({ message: 'Password is empty' })
  password: string;
}
