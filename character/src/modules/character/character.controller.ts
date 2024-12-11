import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from '@prisma/client';
import { newCharacterDTO } from './dto/newCharacter.dto';
import { characterNameDTO } from './dto/сharacterName.dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  createCharacter(
    @Param('id') id: string,
    @Body() characterName: characterNameDTO,
  ): Promise<Character> {
    const newCharacter: newCharacterDTO = {
      name: characterName.name,
      userId: id,
    };

    return this.characterService.createCharacter(newCharacter);
  }
}
