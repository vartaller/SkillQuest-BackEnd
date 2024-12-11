import { Module } from '@nestjs/common';
import { SkillStepController } from './skill-step.controller';
import { SkillStepService } from './skill-step.service';

@Module({
  controllers: [SkillStepController],
  providers: [SkillStepService]
})
export class SkillStepModule {}
