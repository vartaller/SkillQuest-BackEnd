import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prismaService';
import { Character } from '@prisma/client';
import { newCharacterDTO } from './dto/newCharacter.dto';

@Injectable()
export class CharacterService {
  constructor(private readonly prisma: PrismaService) {}

  async createCharacter(newCharacter: newCharacterDTO): Promise<Character> {
    try {
      const createdCharacter = await this.prisma.character.create({
        data: { ...newCharacter },
      });
      return createdCharacter;
    } catch (err) {
      throw new Error(err);
    }
  }
}
