import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { UsersController } from './models/users/users.controller';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthenticationModule } from './authentication/authentication.module';
import { PassportModule } from '@nestjs/passport';
import { CourseModule } from './models/course/course.module';
import { ClassGroupModule } from './models/class-group/class-group.module';
import { CourseController } from './models/course/course.controller';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
    consumer.apply(LoggerMiddleware).forRoutes(CourseController);
    consumer.apply(LoggerMiddleware).forRoutes(ClassGroupController);
  }
}
