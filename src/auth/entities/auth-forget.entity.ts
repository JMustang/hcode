import { IsEmail } from 'class-validator';

export class AuthForgetEntity {
  @IsEmail()
  email: string;
}
