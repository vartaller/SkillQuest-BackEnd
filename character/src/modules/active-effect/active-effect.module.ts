import { Module } from '@nestjs/common';
import { ActiveEffectController } from './active-effect.controller';
import { ActiveEffectService } from './active-effect.service';

@Module({
  controllers: [ActiveEffectController],
  providers: [ActiveEffectService],
})
export class ActiveEffectModule {}
