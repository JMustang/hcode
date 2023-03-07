import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginEntity } from './entities/auth-login.entity';
import { AuthRegisterEntity } from './entities/auth-register.entity';
import { AuthForgetEntity } from './entities/auth-forget.entity';
import { AuthResetEntity } from './entities/auth-reset.entity';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() body: AuthLoginEntity) {}

  @Post('register')
  async register(@Body() body: AuthRegisterEntity) {}

  @Post('forget')
  async forget(@Body() body: AuthForgetEntity) {}

  @Post('reset')
  async reset(@Body() body: AuthResetEntity) {}
}
