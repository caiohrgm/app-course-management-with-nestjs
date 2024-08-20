import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ClassGroup } from './interfaces/class-group.interface';
import { ClassGroupEntity } from './entities/class-group.entity';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClassGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ClassGroup): Promise<ClassGroupEntity> {
    if (
      data.className === null ||
      data.className === undefined ||
      data.className === ''
    ) {
      throw new HttpException(
        'Class name cannot be empty.',
        HttpStatus.FORBIDDEN,
      );
    }

    try {
      const classGroup = await this.prisma.classGroup.create({ data });
      return new ClassGroupEntity(classGroup);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // Controlling error with constraint error on the key;
          throw new ConflictException('Class with this name already exists.');
        }
      }
    }
    return new ClassGroupEntity(null);
  }

  async findAll(): Promise<ClassGroupEntity[]> {
    const classGroups = await this.prisma.classGroup.findMany();
    return classGroups.map((classGroup) => new ClassGroupEntity(classGroup));
  }

  async findById(id: string): Promise<ClassGroupEntity> {
    const classGroup = await this.prisma.classGroup.findFirst({
      where: { id },
    });
    return classGroup ? new ClassGroupEntity(classGroup) : null;
  }

  async findByName(className: string): Promise<ClassGroupEntity> {
    const classGroup = await this.prisma.classGroup.findFirst({
      where: { className },
    });
    return classGroup ? new ClassGroupEntity(classGroup) : null;
  }

  async update(
    id: string,
    data: UpdateClassGroupDto,
  ): Promise<ClassGroupEntity> {
    const classGroup = await this.prisma.classGroup.update({
      where: { id },
      data,
    });
    console.log(classGroup);
    return new ClassGroupEntity(classGroup);
  }

  async remove(id: string) {
    await this.prisma.classGroup.delete({ where: { id } });
  }
}
