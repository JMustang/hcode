import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalInterceptors(new LogInterceptor());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
