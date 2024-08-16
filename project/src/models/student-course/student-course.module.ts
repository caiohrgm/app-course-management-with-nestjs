import { Module } from '@nestjs/common';
import { StudentCourseController } from './student-course.controller';
import { StudentCourseService } from './student-course.service';

@Module({
  controllers: [StudentCourseController],
  providers: [StudentCourseService],
})
export class StudentCourseModule {}
