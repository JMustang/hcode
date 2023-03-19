import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserEntity {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 5,
    minNumbers: 0,
    minLowercase: 0,
    minUppercase: 0,
    minSymbols: 0,
  })
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: string;

  @IsOptional()
  @IsEnum(Role)
  role: number;
}
