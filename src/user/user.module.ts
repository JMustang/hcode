import { UserIdCheckMiddleware } from './../middlewares/user-id-check.middleware';
import { PrismaModule } from './../prisma/prisma.module';
import { UserController } from './user.controller';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: '/users/:id',
      method: RequestMethod.ALL,
    });
  }
}
