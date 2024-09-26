import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalEntity } from './animal.entity';
import { Animal } from './Types';

@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  async getAllAnimals(): Promise<AnimalEntity[]> {
    return await this.animalService.getAllAnimal();
  }

  @Get(':id')
  async getAnimal(@Param('id') id: number): Promise<AnimalEntity> {
    return await this.animalService.getAnimal(id);
  }

  @Post()
  async createAnimal(@Body() data: Animal): Promise<AnimalEntity> {
    return await this.animalService.createAnimal(data);
  }

  @Put(':id')
  async updateAnimal(
    @Param('id') id: number,
    @Body() data: Animal,
  ): Promise<AnimalEntity> {
    return await this.animalService.updateAnimal(id, data);
  }

  @Delete(':id')
  async deleteAnimal(@Param('id') id: number): Promise<boolean> {
    return await this.animalService.deleteAnimal(id);
  }
}
