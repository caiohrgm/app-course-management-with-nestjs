import { Module } from '@nestjs/common';
import { ClassGroupController } from './class-group.controller';
import { ClassGroupService } from './class-group.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [ClassGroupController],
  providers: [ClassGroupService, PrismaService],
  exports: [ClassGroupService],
})
export class ClassGroupModule {}
