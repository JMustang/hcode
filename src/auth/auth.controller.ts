import { UserService } from './../user/user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginEntity } from './entities/auth-login.entity';
import { AuthRegisterEntity } from './entities/auth-register.entity';
import { AuthForgetEntity } from './entities/auth-forget.entity';
import { AuthResetEntity } from './entities/auth-reset.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginEntity) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterEntity) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetEntity) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetEntity) {
    return this.authService.reset(password, token);
  }
}
