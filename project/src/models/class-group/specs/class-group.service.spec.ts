import { Test, TestingModule } from '@nestjs/testing';
import { ClassGroupService } from './class-group.service';

describe('ClassGroupService', () => {
  let service: ClassGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassGroupService],
    }).compile();

    service = module.get<ClassGroupService>(ClassGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
