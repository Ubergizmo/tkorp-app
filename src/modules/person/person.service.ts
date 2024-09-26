import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PersonEntity } from './person.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './Type';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  private validatePersonData(data: Person) {
    const requiredFields = [
      { field: data.firstName, message: 'Le champ "firstName" est requis.' },
      { field: data.lastName, message: 'Le champ "lastName" est requis.' },
      { field: data.email, message: 'Le champ "email" est requis.' },
      {
        field: data.phoneNumber,
        message: 'Le champ "phoneNumber" est requis.',
      },
    ];

    for (const { field, message } of requiredFields) {
      if (!field) throw new BadRequestException(message);
    }
  }

  async createPerson(data: Person): Promise<PersonEntity> {
    this.validatePersonData(data);

    const person = this.personRepository.create(data);
    return await this.personRepository.save(person);
  }

  async getPerson(id: number): Promise<PersonEntity> {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['animals'],
    });
    if (!person)
      throw new NotFoundException(
        'Aucun résultat',
        `La personne avec le ID:${id} n'existe pas`,
      );
    return person;
  }

  async getAllPerson(): Promise<PersonEntity[]> {
    return await this.personRepository.find({});
  }

  async updatePerson(id: number, data: Person): Promise<PersonEntity> {
    this.validatePersonData(data);

    const person = await this.personRepository.findOne({ where: { id } });
    if (!person)
      throw new NotFoundException(
        'Aucun résultat',
        `La personne avec le ID:${id} n'existe pas`,
      );

    await this.personRepository.update(id, data);
    return await this.personRepository.findOne({ where: { id } });
  }

  async deletePerson(id: number) {
    const person = await this.personRepository.delete(id);
    if (person.affected === 0)
      throw new NotFoundException(
        'Aucun résultat',
        `La personne avec le ID:${id} n'existe pas`,
      );
    return true;
  }
}
