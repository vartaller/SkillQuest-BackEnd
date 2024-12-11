import { Test, TestingModule } from '@nestjs/testing';
import { SkillStepController } from './skill-step.controller';

describe('SkillStepController', () => {
  let controller: SkillStepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillStepController],
    }).compile();

    controller = module.get<SkillStepController>(SkillStepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
