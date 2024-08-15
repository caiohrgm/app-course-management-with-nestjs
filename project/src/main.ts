import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());
  app.useLogger(passport.session());
  app.enableShutdownHooks();

  await app.listen(3000);
}

bootstrap();
