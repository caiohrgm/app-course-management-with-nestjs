import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
// import { logger } from './common/middlewares/logger.middleware';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UsersModule } from './models/users/users.module';
import { UsersController } from './models/users/users.controller';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
  }
}
