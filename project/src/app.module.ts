import { ConfigModule } from '@nestjs/config';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthenticationModule } from './authentication/authentication.module';
import { PassportModule } from '@nestjs/passport';
import { CourseModule } from './models/course/course.module';
import { ClassGroupModule } from './models/class-group/class-group.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';
import { PrismaClientExceptionFilter } from './common/exceptions/prisma-exceptions/prisma-exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { CourseController } from './models/course/course.controller';
import { UsersController } from './models/users/users.controller';
import { ClassGroupController } from './models/class-group/class-group.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    CourseModule,
    ClassGroupModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CourseController);
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
    consumer.apply(LoggerMiddleware).forRoutes(ClassGroupController);
  }
}
