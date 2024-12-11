import { Test, TestingModule } from '@nestjs/testing';
import { ActiveEffectController } from './active-effect.controller';

describe('ActiveEffectController', () => {
  let controller: ActiveEffectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActiveEffectController],
    }).compile();

    controller = module.get<ActiveEffectController>(ActiveEffectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
