import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonEntity } from './person.entity';
import { Person } from './Type';

@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async getAllPersons(): Promise<PersonEntity[]> {
    return await this.personService.getAllPerson();
  }

  @Get(':id')
  async getPerson(@Param('id') id: number): Promise<PersonEntity> {
    return await this.personService.getPerson(id);
  }

  @Post()
  async createPerson(@Body() data: Person): Promise<PersonEntity> {
    return await this.personService.createPerson(data);
  }

  @Put(':id')
  async updatePerson(
    @Param('id') id: number,
    @Body() data: Person,
  ): Promise<PersonEntity> {
    return await this.personService.updatePerson(id, data);
  }

  @Delete(':id')
  async deletePerson(@Param('id') id: number): Promise<boolean> {
    return await this.personService.deletePerson(id);
  }
}
