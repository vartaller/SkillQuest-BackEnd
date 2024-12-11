import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './modules/character/character.module';
import { PrismaService } from './services/prismaService';

@Module({
  imports: [CharacterModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
