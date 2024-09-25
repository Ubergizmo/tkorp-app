import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql'; // Importez ObjectType et Field
import { PersonEntity } from '../person/person.entity';

@ObjectType()
@Entity()
export class AnimalEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar', { length: 500 })
  name: string;

  @Field(()=>Date)
  @Column('date')
  dateOfBirth: Date;

  @Field()
  @Column('varchar', { length: 500 })
  species: string;

  @Field()
  @Column('varchar', { length: 500 })
  breed: string;

  @Field()
  @Column('varchar', { length: 500 })
  color: string;

  @Field()
  @Column('int')
  weight: number;

  @Field()
  @Column('int')
  ownerId: number;

  @Field(() => PersonEntity)
  @ManyToOne(() => PersonEntity, (person) => person.animals)
  owner: PersonEntity;
}
