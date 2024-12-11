import { Test, TestingModule } from '@nestjs/testing';
import { SkillStepService } from './skill-step.service';

describe('SkillStepService', () => {
  let service: SkillStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillStepService],
    }).compile();

    service = module.get<SkillStepService>(SkillStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
