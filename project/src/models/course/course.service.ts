import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      throw new ConflictException(
        'A record with the provided information already exists.',
      );
    }
  }

  async findAll(): Promise<CourseEntity[]> {
    const courses = await this.prisma.course.findMany();
    if (courses.length == 0) {
      throw new NotFoundException('There are no records in the database.');
    }
    return courses.map((course) => new CourseEntity(course));
  }

  async findById(id: string): Promise<CourseEntity | null> {
    const course = await this.prisma.course.findUnique({ where: { id } });

    if (!course) {
      throw new NotFoundException('Not found required records.');
    }
    return course ? new CourseEntity(course) : null;
  }

  async findByName(courseName: string): Promise<CourseEntity | null> {
    const course = await this.prisma.course.findUnique({
      where: { courseName },
    });

    if (!course) {
      throw new NotFoundException('Not found required records.');
    }
    return course ? new CourseEntity(course) : null;
  }

  async update(id: string, data: UpdateCourseDto): Promise<CourseEntity> {
    const course = await this.prisma.course.update({
      where: { id: id },
      data,
    });
    return new CourseEntity(course);
  }

  async remove(id: string) {
    await this.prisma.course.delete({ where: { id: id } });
  }
}
