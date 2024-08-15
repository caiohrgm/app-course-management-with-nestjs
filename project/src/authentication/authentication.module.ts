import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { HashService } from './hash/hash.service';
import { HashModule } from './hash/hash.module';
import { UsersService } from 'src/models/users/users.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
// import { JwtService } from '@nestjs/jwt';
import { JwtAuthStrategy } from '../authentication/strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    JwtModule.register({
      secret: 'SuperSecretJWTKey',
    }),
    HashModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    HashService,
    UsersService,
    PrismaService,
    JwtAuthStrategy,
    JwtService,
  ],
  exports: [UsersService],
})
export class AuthenticationModule {}
