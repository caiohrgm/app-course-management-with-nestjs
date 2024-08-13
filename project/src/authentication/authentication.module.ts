import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { HashService } from './hash/hash.service';
import { HashModule } from './hash/hash.module';
import { UsersService } from 'src/models/users/users.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  imports: [HashModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, HashService, UsersService, PrismaService],
  exports: [UsersService],
})
export class AuthenticationModule {}
