import { Test, TestingModule } from '@nestjs/testing';
import { PassiveEffectController } from './passive-effect.controller';

describe('PassiveEffectController', () => {
  let controller: PassiveEffectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassiveEffectController],
    }).compile();

    controller = module.get<PassiveEffectController>(PassiveEffectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
