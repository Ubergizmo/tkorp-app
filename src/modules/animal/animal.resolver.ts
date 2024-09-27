import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnimalService } from './animal.service';
import { AnimalEntity } from './animal.entity';
import { CreateAnimalInput } from './animal.input';

@Resolver()
export class AnimalResolver {
  constructor(private readonly animalService: AnimalService) {}

  @Query(() => AnimalEntity)
  async animal(@Args('id') id: number) {
    return await this.animalService.getAnimal(id);
  }

  @Query(() => AnimalEntity)
  async oldestAnimal() {
    return await this.animalService.oldestAnimal();
  }

  @Query(() => AnimalEntity)
  async mostRepresentedSpecies() {
    return await this.animalService.mostRepresentedSpecies();
  }

  @Query(() => AnimalEntity)
  async getAnimalsWithOwnersByWeight() {
    return await this.animalService.getAnimalsWithOwnersByWeight();
  }

  @Query(() => [AnimalEntity])
  async animals() {
    return await this.animalService.getAllAnimal();
  }

  @Mutation(() => AnimalEntity)
  async createAnimal(@Args('data') data: CreateAnimalInput) {
    return await this.animalService.createAnimal(data);
  }

  @Mutation(() => AnimalEntity)
  async updateAnimal(
    @Args('id') id: number,
    @Args('data') data: CreateAnimalInput,
  ) {
    return await this.animalService.updateAnimal(id, data);
  }

  @Mutation(() => Boolean)
  async deleteAnimal(@Args('id') id: number) {
    await this.animalService.deleteAnimal(id);
    return true;
  }
}
