import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mn^me5v>eww;o8~t5:-oseCHJ72TDB&M',
    }),
  ],
})
export class AuthModule {}
