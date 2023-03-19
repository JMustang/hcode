import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthLoginEntity {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;
}
