import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ClassGroup } from './interfaces/class-group.interface';
import { ClassGroupEntity } from './entities/class-group.entity';

@Injectable()
export class ClassGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ClassGroup): Promise<ClassGroupEntity> {
    try {
      const classGroup = await this.prisma.classGroup.create({ data });
      return new ClassGroupEntity(classGroup);
    } catch {
      throw new ConflictException('Class Already Registered');
    }
  }
}
