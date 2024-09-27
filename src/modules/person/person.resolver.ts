import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PersonEntity } from './person.entity';
import { PersonService } from './person.service';
import { Person } from './Type';
import { CreatePersonInput } from './person.input';

@Resolver(() => PersonEntity)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Query(() => [PersonEntity])
  async persons() {
    return await this.personService.getAllPerson();
  }

  @Query(() => PersonEntity)
  async person(@Args('id') id: number) {
    return await this.personService.getPerson(id);
  }

  @Query(() => PersonEntity)
  async ownerWithMostCats() {
    return await this.personService.ownerWithMostCats();
  }

  @Mutation(() => PersonEntity)
  async createPerson(@Args('data') data: CreatePersonInput) {
    return await this.personService.createPerson(data);
  }

  @Mutation(() => PersonEntity)
  async updatePerson(
    @Args('id') id: number,
    @Args('data') data: CreatePersonInput,
  ) {
    return await this.personService.updatePerson(id, data);
  }

  @Mutation(() => Boolean)
  async deletePerson(@Args('id') id: number) {
    await this.personService.deletePerson(id);
    return true;
  }
}
