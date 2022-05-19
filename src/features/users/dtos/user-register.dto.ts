import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'Email is not correct' })
  email: string;

  @IsString({ message: 'Password is empty' })
  @MinLength(5, {
    message: 'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  password: string;

  @IsString({ message: 'Name is required' })
  name: string;
}
