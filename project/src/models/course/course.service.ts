import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CourseEntity } from './entities/course.entity';
import { Course } from './interfaces/course.interface';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Course): Promise<CourseEntity> {
    try {
      const course = await this.prisma.course.create({ data });
      return new CourseEntity(course);
    } catch {
      throw new ConflictException('Course already registered.');
    }
  }

  async findAll(): Promise<CourseEntity[]> {
    const courses = await this.prisma.course.findMany();
    return courses.map((course) => new CourseEntity(course));
  }

  async findById(id: string): Promise<CourseEntity | null> {
    const course = await this.prisma.course.findUnique({ where: { id } });
    return course ? new CourseEntity(course) : null;
  }

  async findByName(courseName: string): Promise<CourseEntity | null> {
    const course = await this.prisma.course.findUnique({
      where: { courseName },
    });
    return course ? new CourseEntity(course) : null;
  }

  async update(id: string, data: UpdateCourseDto): Promise<CourseEntity> {
    const course = await this.prisma.course.update({
      where: { id },
      data,
    });
    return new CourseEntity(course);
  }

  async remove(id: string) {
    await this.prisma.course.delete({ where: { id } });
  }
}
