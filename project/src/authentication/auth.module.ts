import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HashService } from './hash/hash.service';
import { HashModule } from './hash/hash.module';
import { UsersService } from 'src/models/users/users.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
// import { JwtService } from '@nestjs/jwt';
import { JwtAuthStrategy } from '../authentication/strategies/jwt.strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/models/users/users.module';
import { jwtConstants } from './constants/constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    HashModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashService,
    UsersService,
    PrismaService,
    JwtAuthGuard,
    JwtAuthStrategy,
    JwtService,
  ],
  exports: [UsersService, JwtAuthGuard, JwtModule, AuthService],
})
export class AuthModule {}
