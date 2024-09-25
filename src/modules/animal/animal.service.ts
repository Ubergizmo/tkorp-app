import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalEntity } from './animal.entity';
import { Repository } from 'typeorm';
import { Animal } from './Types';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>,
  ) {}

  private validateAnimalData(data: Animal) {
    const requiredFields = [
      { field: data.name, message: 'Le champ "name" est requis.' },
      {
        field: data.dateOfBirth,
        message: 'Le champ "dateOfBirth" est requis.',
      },
      { field: data.species, message: 'Le champ "species" est requis.' },
      { field: data.breed, message: 'Le champ "breed" est requis.' },
      { field: data.color, message: 'Le champ "color" est requis.' },
      { field: data.weight, message: 'Le champ "weight" est requis.' },
      { field: data.ownerId, message: 'Le champ "ownerId" est requis.' },
    ];

    for (const { field, message } of requiredFields) {
      if (!field) throw new BadRequestException(message);
    }
  }

  async createAnimal(data: Animal): Promise<AnimalEntity> {
    this.validateAnimalData(data);

    const animal = this.animalRepository.create(data);
    return await this.animalRepository.save(animal);
  }

  async getAnimal(id: number): Promise<AnimalEntity> {
    const animal = await this.animalRepository.findOne({ where: { id } });
    if (!animal)
      throw new NotFoundException(
        'Aucun résultat',
        `L'animal avec le ID:${id} n'existe pas`,
      );
    return animal;
  }

  async getAllAnimal(): Promise<AnimalEntity[]> {
    return await this.animalRepository.find();
  }

  async updateAnimal(id: number, data: Animal): Promise<AnimalEntity> {
    this.validateAnimalData(data);

    const animal = await this.animalRepository.findOne({ where: { id } });
    if (!animal)
      throw new NotFoundException(
        'Aucun résultat',
        `L'animal avec le ID:${id} n'existe pas`,
      );

    await this.animalRepository.update(id, data);
    return await this.animalRepository.findOne({ where: { id } });
  }

  async deleteAnimal(id: number) {
    const animal = await this.animalRepository.delete(id);
    if (animal.affected === 0)
      throw new NotFoundException(
        'Aucun résultat',
        `L'animal avec le ID:${id} n'existe pas`,
      );
    return true;
  }
}
