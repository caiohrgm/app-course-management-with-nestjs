import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { PrismaClientExceptionFilter } from './common/exceptions/prisma-exceptions/prisma-exception.filter';
import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';

// const sessionOptions = {
//   secret: process.env.SESSION_SECRET,
//   saveUninitialized: false,
//   resave: false,
//   cookie: { maxAge: 60000 },
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.setGlobalPrefix('api');

  // app.use(session(sessionOptions));
  // app.use(passport.initialize());
  // app.use(passport.session());

  app.enableShutdownHooks();

  // Setting Up Swagger:
  const swaggerConfig = new DocumentBuilder()
    .setTitle('App Course Management - Backend')
    .setDescription('ULAR Universe API')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'jwt', // Identificador do esquema de autenticação
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  document.tags = [
    { name: 'authentication', description: 'Allow users to signup and signin' },
    { name: 'users', description: 'User service' },
    { name: 'class-group', description: 'Class-group service' },
    { name: 'course', description: 'Course service' },
  ];

  SwaggerModule.setup('api/swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // This persists authorization across page reloads;
    },
  });

  await app.listen(3333);
}

bootstrap();
