import { Test, TestingModule } from '@nestjs/testing';
import { StudentCourseService } from './student-course.service';

describe('StudentCourseService', () => {
  let service: StudentCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentCourseService],
    }).compile();

    service = module.get<StudentCourseService>(StudentCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
