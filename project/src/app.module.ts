import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { logger } from './common/middlewares/logger.middleware';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UsersModule } from './models/users/users.module';
import { UsersController } from './models/users/users.controller';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    UsersModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
  }
}
