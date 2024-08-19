import { Test, TestingModule } from '@nestjs/testing';
import { ClassGroupController } from './class-group.controller';

describe('ClassGroupController', () => {
  let controller: ClassGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassGroupController],
    }).compile();

    controller = module.get<ClassGroupController>(ClassGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
