import { ConfigModule } from '@nestjs/config';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { PassportModule } from '@nestjs/passport';
import { CourseModule } from './models/course/course.module';
import { ClassGroupModule } from './models/class-group/class-group.module';
import { APP_GUARD } from '@nestjs/core';
// import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';
// import { PrismaClientExceptionFilter } from './common/exceptions/prisma-exceptions/prisma-exception.filter';
// import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { CourseController } from './models/course/course.controller';
import { UsersController } from './models/users/users.controller';
import { ClassGroupController } from './models/class-group/class-group.controller';
import { RolesGuard } from './authentication/guard/roles.guard';
import { PrismaService } from './common/prisma/prisma.service';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    CourseModule,
    ClassGroupModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UsersController, CourseController, ClassGroupController],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CourseController);
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
    consumer.apply(LoggerMiddleware).forRoutes(ClassGroupController);
  }
}
