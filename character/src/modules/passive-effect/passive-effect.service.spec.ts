import { Test, TestingModule } from '@nestjs/testing';
import { PassiveEffectService } from './passive-effect.service';

describe('PassiveEffectService', () => {
  let service: PassiveEffectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassiveEffectService],
    }).compile();

    service = module.get<PassiveEffectService>(PassiveEffectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
