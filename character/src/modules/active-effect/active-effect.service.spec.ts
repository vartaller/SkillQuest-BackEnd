import { Test, TestingModule } from '@nestjs/testing';
import { ActiveEffectService } from './active-effect.service';

describe('ActiveEffectService', () => {
  let service: ActiveEffectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActiveEffectService],
    }).compile();

    service = module.get<ActiveEffectService>(ActiveEffectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
